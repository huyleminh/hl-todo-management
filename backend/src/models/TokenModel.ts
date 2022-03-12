import { CommonUtils } from "../utils/Common";
import { DbConnection } from "../utils/DbConnection";

export default class TokenModel {
	private static TABLE_NAME: string = "token";

	public userId: number;
	public tokenUuid: string;
	public refreshToken: string;
	public createdDate: string;
	public lastUpdatedDate: string;
	public expiresDate: string;

	constructor() {
		this.userId = -1;
		this.tokenUuid = "";
		this.refreshToken = "";
		this.createdDate = "";
		this.lastUpdatedDate = "";
		this.expiresDate = "";
	}

	static getByuseridAndUuid(userId: string, uuid: string): Promise<TokenModel[]> {
		return new Promise(async function (resolve, reject) {
			try {
				const resultSet = await DbConnection(TokenModel.TABLE_NAME)
					.where({
						token_uuid: uuid,
						user_id: userId,
					})
					.select();
				resolve(resultSet.map((item) => CommonUtils.convertToCamelCaseObject(item)));
			} catch (error) {
				reject(error);
			}
		});
	}

	static insert(entity: TokenModel): Promise<number | void> {
		return new Promise(async function (resolve, reject) {
			try {
				const resultSet = await DbConnection(TokenModel.TABLE_NAME).insert(
					CommonUtils.convertToSnakeCaseObject(entity),
				);
				resolve(resultSet[0]);
			} catch (error) {
				reject(error);
			}
		});
	}

	static delete(userId: string, uuid: string): Promise<number> {
		return new Promise(async function (resolve, reject) {
			try {
				const resultSet = await DbConnection(TokenModel.TABLE_NAME)
					.where({
						user_id: userId,
						token_uuid: uuid,
					})
					.delete();
				resolve(resultSet);
			} catch (error) {
				reject(error);
			}
		});
	}
}
