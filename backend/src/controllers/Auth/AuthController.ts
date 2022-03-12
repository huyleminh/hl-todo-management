import {} from "crypto";
import { OAuth2Client } from "google-auth-library";
import * as jwt from "jsonwebtoken";
import { v4 as uuidV4 } from "uuid";
import { AppConfigs, GoggleConfigs } from "../../../configs/config";
import { IAppRequest, IAppResponse } from "../../interfaces/base/AppBase";
import TokenModel from "../../models/TokenModel";
import UserModel, { UserTypeEnum } from "../../models/UserModel";
import AppResponse from "../../shared/AppResponse";
import CommonConsts from "../../shared/CommonConsts";
import { BcryptUtils, CommonUtils } from "../../utils/Common";
import AppController from "../AppController";
import moment = require("moment");
import { Logger } from "../../utils/Logger";
import { ValidateAuthDataMid } from "../../middlewares/AuthMiddlewares";

export default class AuthController extends AppController {
	constructor() {
		super();
	}

	init(): void {
		this._router.get("/login/google", this.getLoginGoogleAsync);
		this._router.get("/refresh-token", this.getRefreshTokenAsync);

		this._router.post("/login", this.postLoginAsync);
		this._router.post(
			"/register",
			ValidateAuthDataMid.validateRegisterData,
			this.postRegisterAsync,
		);
	}

	async postLoginAsync(req: IAppRequest, res: IAppResponse) {
		const { body } = req;
		const apiResponse = new AppResponse(res);

		if (!body.email || !body.email.trim() || !body.password || !body.password.trim()) {
			return apiResponse.statusCode(400).message("invalid_data").send();
		}

		try {
			const [user] = await UserModel.getUserByUniqueColumn("email", body.email);
			if (user === undefined) {
				return apiResponse.statusCode(400).message("invalid_login").send();
			}

			const isPasswordValid = BcryptUtils.verifyHashedString(body.password, user.password);
			if (!isPasswordValid) {
				apiResponse.statusCode(400).message("invalid_login").send();
				return;
			}

			const accessToken = jwt.sign(
				{
					userId: user.userId,
					userType: user.userType,
				},
				AppConfigs.JWT_SIGN,
				{
					expiresIn: "5 mins",
				},
			);

			const refreshToken = jwt.sign(
				{
					userId: user.userId,
					userType: user.userType,
				},
				AppConfigs.JWT_REFRESH,
				{
					expiresIn: "7 days",
				},
			);

			const refreshTokenUid = uuidV4();
			const idToken = jwt.sign(
				{
					refeshUuid: refreshTokenUid,
					userId: user.userId,
					userType: user.userType,
					email: user.email,
					name: `${user.firstName} ${user.lastName}`,
				},
				AppConfigs.JWT_ID_TOKEN,
				{ expiresIn: "7 days" },
			);

			// insert token
			TokenModel.insert({
				userId: user.userId,
				tokenUuid: refreshTokenUid,
				refreshToken,
				createdDate: moment().format(CommonConsts.MOMENT_BASE_DB_FORMAT),
				lastUpdatedDate: moment().format(CommonConsts.MOMENT_BASE_DB_FORMAT),
				expiresDate: moment().add(7, "days").format(CommonConsts.MOMENT_BASE_DB_FORMAT),
			} as TokenModel);

			apiResponse
				.message("OK")
				.data({
					accessToken,
					refreshToken,
					idToken,
					expiresIn: 3000, // 5 mins
					expiresAt: moment().add(5, "minute").valueOf(),
					infor: `${user.firstName} ${user.lastName}`,
				})
				.send();
		} catch (error) {
			CommonUtils.handleAsyncError(apiResponse, error);
		}
	}

	async getLoginGoogleAsync(req: IAppRequest, res: IAppResponse) {
		const { headers } = req;
		const { authorization } = headers;
		const tokenId = authorization?.split(" ")[1];
		const apiRes = new AppResponse(res);

		if (tokenId === undefined) {
			return apiRes.statusCode(401).message("unauthorized_google").send();
		}

		const client = new OAuth2Client(GoggleConfigs.GOOGLE_AUTH_CLIENT_ID);
		try {
			const ticket = await client.verifyIdToken({
				idToken: tokenId,
				audience: GoggleConfigs.GOOGLE_AUTH_CLIENT_ID,
			});

			const payload = ticket.getPayload();
			if (payload === undefined) {
				return apiRes.statusCode(401).message("unauthorized_user").send();
			}

			const { email, family_name, given_name, name, sub } = payload;
			const [user] = await UserModel.getUserByUniqueColumn("email", email || "");

			let accessToken = "";
			if (user === undefined) {
				const newUser = {
					password: BcryptUtils.generateHash(sub),
					email,
					userType: UserTypeEnum.GOOGLE,
					firstName: given_name,
					lastName: family_name,
				} as UserModel;
				const id = await UserModel.insert(newUser);
				accessToken = jwt.sign(
					{
						userId: id,
						username: email,
						userType: UserTypeEnum.GOOGLE,
					},
					AppConfigs.JWT_SIGN,
					{
						expiresIn: "1h",
					},
				);
			} else {
				accessToken = jwt.sign(
					{
						userId: user.userId,
						userType: user.userType,
					},
					AppConfigs.JWT_SIGN,
					{
						expiresIn: "1h",
					},
				);
			}

			apiRes
				.data({
					accessToken,
					expiresIn: 3598000,
					expiresAt: moment().add(3598, "seconds").valueOf(),
					infor: name,
				})
				.send();
		} catch (error) {
			CommonUtils.handleAsyncError(apiRes, error);
		}
	}

	getRefreshTokenAsync(req: IAppRequest, res: IAppResponse) {
		const { query, headers } = req;
		const refreshToken = query.refresh_token;
		const idToken = headers.authorization?.split(" ")[1];
		const apiResponse = new AppResponse(res);

		if (idToken === undefined || refreshToken === undefined) {
			return apiResponse.statusCode(401).message("unauthorized_user").send();
		}

		jwt.verify(idToken, AppConfigs.JWT_ID_TOKEN, async function (error, data) {
			if (error) {
				Logger.error("Id Token error", error);
				return apiResponse.statusCode(403).send();
			}

			const { refeshUuid, userId } = data as any;
			const [tokenObj] = await TokenModel.getByuseridAndUuid(userId, refeshUuid);

			if (tokenObj === undefined || tokenObj.refreshToken !== refreshToken) {
				return apiResponse.statusCode(403).send();
			}

			jwt.verify(refreshToken, AppConfigs.JWT_REFRESH, async function (error, data) {
				if (error) {
					Logger.error("Refresh Token error", error);
					TokenModel.delete(userId, refeshUuid);
					return apiResponse.statusCode(403).send();
				}

				const accessToken = jwt.sign({ data }, AppConfigs.JWT_SIGN, {
					expiresIn: "5 mins",
				});

				apiResponse
					.data({
						accessToken,
						expiresIn: 3000, // 5 mins
						expiresAt: moment().add(5, "minute").valueOf(),
					})
					.send();
			});
		});
	}

	async postRegisterAsync(req: IAppRequest, res: IAppResponse) {
		const userInfo = res.locals.user;
		const apiRes = new AppResponse(res);

		try {
			const [user] = await UserModel.getUserByUniqueColumn("email", userInfo.email);
			if (user !== undefined) {
				return apiRes.statusCode(400).message("existed_email").send();
			}

			const hashPass = BcryptUtils.generateHash(userInfo.password);

			await UserModel.insert({ ...userInfo, password: hashPass });
			apiRes.statusCode(201).send();
		} catch (error) {
			CommonUtils.handleAsyncError(apiRes, error);
		}
	}
}
