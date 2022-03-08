export interface IUserLogin {
	username: string;
	password: string;
}

export interface ILoginResponse {
	accesToken: string;
	expireIn: number;
	expireAt: number;
	infor: string;
}
