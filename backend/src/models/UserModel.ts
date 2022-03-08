import { IBaseModelInstance } from "../interfaces/model/BaseModel";
import { CommonUtils } from "../utils/Common";
import { DbConnection } from "../utils/DbConnection";

export default class UserModel implements IBaseModelInstance {
	private static TABLE_NAME: string = "user";

	public userId: number;
	public username: string;
	public password: string;
	public email: string;
	public userType: number;
	public dateOfBirth: Date;
	public firstName: string;
	public lastName: string;
	public status: number;
	public createdDate: Date;
	public lasUpdatedDate: Date;

	constructor() {
		this.userId = 0;
		this.username = "";
		this.password = "";
		this.email = "";
		this.userType = 0;
		this.dateOfBirth = new Date();
		this.firstName = "";
		this.lastName = "";
		this.status = 0;
		this.createdDate = new Date();
		this.lasUpdatedDate = new Date();
	}

	insert(): string | number | void {}

	delete(): number | void {}

	update(): string | number | void {}

	static getUserByUsername(username: string): Promise<UserModel[]> {
		return new Promise(async function (resolve, reject) {
			try {
				const resultSet = await DbConnection(UserModel.TABLE_NAME)
					.where({
						username,
					})
					.select();
				resolve(resultSet.map((item) => CommonUtils.convertToCamelCaseObject(item)));
			} catch (error) {
				reject(error);
			}
		});
	}
}
