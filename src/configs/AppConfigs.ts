export default class AppConfigs {
	static get API_URL(): string {
		return process.env.REACT_APP_API_URL || "http://localhost:5000";
	}

	static get GOOGLE_AUTH_CLIENT_ID(): string {
		return process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID || "";
	}

	static get GOOGLE_AUTH_CLIENT_SECRET(): string {
		return process.env.REACT_APP_GOOGLE_AUTH_CLIENT_SECRET || "";
	}
}
