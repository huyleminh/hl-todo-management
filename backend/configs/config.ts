import * as dotenv from "dotenv";

dotenv.config();

export class AppConfigs {
	static get AUTH_CLIENT_URL(): string {
		return process.env.AUTH_CLIENT_URL ? process.env.AUTH_CLIENT_URL : "*";
	}

	static get PORT(): number {
		return process.env.PORT ? +process.env.PORT : 5000;
	}

	static get APP_URL(): string {
		return process.env.APP_URL ? process.env.APP_URL : "http://localhost";
	}

	static get JWT_SIGN(): string {
		return process.env.JWT_SIGN_SECRET ? process.env.JWT_SIGN_SECRET : "";
	}

	static get JWT_REFRESH(): string {
		return process.env.JWT_REFRESH_SECRET ? process.env.JWT_REFRESH_SECRET : "";
	}
}

export class DBConfigs {
	static get DB_HOST(): string {
		return process.env.DB_HOST || "localhost";
	}

	static get DB_USER_NAME(): string {
		return process.env.DB_USER_NAME || "root";
	}

	static get DB_PASSWORD(): string {
		return process.env.DB_PASSWORD || "";
	}

	static get DB_SCHEMA(): string {
		return process.env.DB_SCHEMA || "";
	}

	static get DB_PORT(): number {
		return process.env.DB_PORT ? +process.env.DB_PORT : 3306;
	}
}
