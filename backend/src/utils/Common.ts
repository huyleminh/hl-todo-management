import * as bcrypt from "bcrypt";
import * as _ from "lodash";
import AppResponse from "../shared/AppResponse";
import { Logger } from "./Logger";

export class CommonUtils {
	static handleAsyncError(res: AppResponse, error: any) {
		Logger.error("Error", error);
		res.statusCode(500).message("Internal Error").send();
	}

	static convertToCamelCaseObject(object: any) {
		return Object.keys(object).reduce((acc, curr) => {
			const ret = { ...acc };
			const value = ret[curr];
			delete ret[curr];

			ret[_.camelCase(curr)] = value;
			return ret;
		}, object);
	}

	static convertToSnakeCaseObject(object: any) {
		return Object.keys(object).reduce((acc, curr) => {
			const ret = { ...acc };
			const value = ret[curr];

			delete ret[curr];
			ret[_.snakeCase(curr)] = value;
			return ret;
		}, object);
	}
}

export class BcryptUtils {
	static generateHash(value: string): string {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(value, salt);
		return hash;
	}

	static verifyHashedString(valueToBeCompared: string, hashValue: string): boolean {
		return bcrypt.compareSync(valueToBeCompared, hashValue);
	}
}
