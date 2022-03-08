import { IAppRequest, IAppResponse } from "../../interfaces/base/AppBase";
import UserModel from "../../models/UserModel";
import AppResponse from "../../shared/AppResponse";
import { BcryptUtils, CommonUtils } from "../../utils/Common";
import AppController from "../AppController";
import * as jwt from "jsonwebtoken";
import { AppConfigs } from "../../../configs/config";
import moment = require("moment");

export default class AuthController extends AppController {
	constructor() {
		super();
	}

	init(): void {
		this._router.post("/login", this.postLoginAsync);
	}

	async postLoginAsync(req: IAppRequest, res: IAppResponse) {
		const { body } = req;

		const apiResponse = new AppResponse(res);

		if (!body.username || !body.username.trim() || !body.password || !body.password.trim()) {
			return apiResponse.statusCode(401).message("Invalid data").send();
		}

		try {
			const user = (await UserModel.getUserByUsername(body.username))[0];

			if (user === undefined) {
				return apiResponse.statusCode(401).message("Invalid Login").send();
			}

			const isPasswordValid = BcryptUtils.verifyHashedString(body.password, user.password);
			if (!isPasswordValid) {
				apiResponse.statusCode(401).message("Invalid Login").send();
				return;
			}

			const accessToken = jwt.sign(
				{
					userId: user.userId,
					username: user.username,
					email: user.email,
					userType: user.userType,
				},
				AppConfigs.JWT_SIGN,
				{
					expiresIn: "30 mins",
				},
			);
			apiResponse
				.message("OK")
				.data({
					accessToken,
					expireIn: 1800000, // 30 mins
					expireAt: moment(Date.now()).add(30, "minute").valueOf(),
					infor: `${user.firstName} ${user.lastName}`,
				})
				.send();
		} catch (error) {
			CommonUtils.handleAsyncError(apiResponse, error);
		}
	}
}
