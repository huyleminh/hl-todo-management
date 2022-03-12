import { IBaseModelInstance } from "../interfaces/model/BaseModel";
import { CommonUtils } from "../utils/Common";
import { DbConnection } from "../utils/DbConnection";

export default class UserModel {
	private static TABLE_NAME: string = "user";

	public userId: number;
	public password: string;
	public email: string;
	public userType: number;
	public dateOfBirth: Date;
	public firstName: string;
	public lastName: string;
	public status: number;
	public createdDate: string;
	public lasUpdatedDate: string;

	constructor() {
		this.userId = 0;
		this.password = "";
		this.email = "";
		this.userType = UserTypeEnum.NORMAL;
		this.dateOfBirth = new Date();
		this.firstName = "";
		this.lastName = "";
		this.status = UserStatusEnum.ACTIVE;
		this.createdDate = new Date().toJSON();
		this.lasUpdatedDate = new Date().toJSON();
	}

	static insert(entity: UserModel): Promise<number | void> {
		return new Promise(async function (resolve, reject) {
			try {
				const resultSet = await DbConnection(UserModel.TABLE_NAME).insert(
					CommonUtils.convertToSnakeCaseObject(entity),
				);
				resolve(resultSet[0]);
			} catch (error) {
				reject(error);
			}
		});
	}

	static getUserByUniqueColumn(columnName: string, value: string | number): Promise<UserModel[]> {
		return new Promise(async function (resolve, reject) {
			try {
				const resultSet = await DbConnection(UserModel.TABLE_NAME)
					.where({ [columnName]: value }).select();
				resolve(resultSet.map((item) => CommonUtils.convertToCamelCaseObject(item)));
			} catch (error) {
				reject(error);
			}
		});
	}
}

export enum UserTypeEnum {
	NORMAL,
	GOOGLE,
	FACEBOOK,
}

export enum UserStatusEnum {
	IN_ACTIVE,
	ACTIVE,
}
