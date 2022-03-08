import { IAPIResponse } from "../types/AppInterfaces";
import { ILoginResponse } from "../types/AuthModels";
import HttpService from "./HttpService";

export default class AuthService {
	public static postLoginAsync(username: string, password: string) {
		return HttpService.post<IAPIResponse<ILoginResponse | undefined>>("/login", {
			username,
			password,
		});
	}

	public static setLocalData(data: ILoginResponse): void {
		localStorage.setItem(
			"token",
			JSON.stringify({
				accessToken: data.accesToken,
				expireAt: data.expireAt,
				expireIn: data.expireIn,
			}),
		);
		localStorage.setItem("user", JSON.stringify(data.infor));
	}
}
