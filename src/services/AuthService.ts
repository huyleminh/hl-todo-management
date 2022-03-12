import { AxiosRequestConfig } from "axios";
import { IAPIResponse } from "../types/AppInterfaces";
import { IGoogleLoginResponse, ILoginResponse, IUserRegister } from "../types/AuthModels";
import HttpService from "./HttpService";

export default class AuthService {
	public static postLoginAsync(email: string, password: string) {
		return HttpService.post<IAPIResponse<ILoginResponse>>("/login", {
			email,
			password,
		});
	}

	public static getLoginGoogleAsync(tokenId: string, tokenType: string) {
		const options: AxiosRequestConfig = {
			headers: {
				Authorization: `${tokenType} ${tokenId}`,
			},
		};
		return HttpService.get<IAPIResponse<IGoogleLoginResponse>>("/login/google", options);
	}

	public static postRegisterAsync(user: IUserRegister) {
		return HttpService.post<IAPIResponse<any>>("/register", user);
	}

	public static setLocalData(data: ILoginResponse): void {
		localStorage.removeItem("user");
		localStorage.setItem("user", JSON.stringify(data));
	}

	public static setGoogleLocalData(data: IGoogleLoginResponse): void {
		localStorage.removeItem("user");
		localStorage.setItem("user", JSON.stringify(data));
	}
}
