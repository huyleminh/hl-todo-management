export interface IUserLogin {
	email: string;
	password: string;
}

export interface IUserRegister {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

export interface ILoginResponse {
	accessToken: string;
	expiresIn: number;
	expiresAt: number;
	infor: string;
	refreshToken: string;
	idToken: string;
}

export interface IGoogleLoginResponse {
	accessToken: string;
	expiresIn: number;
	expiresAt: number;
	infor: string;
}
