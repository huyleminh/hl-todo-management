import { IBaseModelInstance } from "../interfaces/model/BaseModel";
import { DbConnection } from "../utils/DbConnection";

export default class AuthDomainModel implements IBaseModelInstance {
	private static TABLE_NAME: string = "auth_domain";

	public domainName: string;
	public domainId?: number;
	public createdDate?: string;

	constructor(domainName: string, domainId?: number, createdDate?: string) {
		this.domainName = domainName;
		this.domainId = domainId;
		this.createdDate = createdDate;
	}

	insert(): string | number | void {}

	delete(): number | void {}

	update(): string | number | void {}

	static getAllAsync() {
		return new Promise(async function (resolve, reject) {
			try {
				const resultSet = await DbConnection<AuthDomainModel>(AuthDomainModel.TABLE_NAME).select();
				resolve(resultSet);
			} catch (error) {
				reject(error);
			}
		});
	}
}
