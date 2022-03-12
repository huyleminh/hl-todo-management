import { IAppNextFuction, IAppRequest, IAppResponse } from "../interfaces/base/AppBase";
import AppResponse from "../shared/AppResponse";

export class AuthUserMid {}

export class ValidateAuthDataMid {
	static validateRegisterData(req: IAppRequest, res: IAppResponse, next: IAppNextFuction) {
		const { body } = req;
        const response = new AppResponse(res).statusCode(400);
		if (
			!body.firstName ||
			!body.firstName.trim() ||
			!body.lastName ||
			!body.lastName.trim() ||
			!body.password ||
			!body.password.trim() ||
            !body.email ||
            !body.email.trim()
		) {
            return response.message("miss_data").send();
		}

        if (!body.password.match(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*.,]).{8,}$"))) {
            return response.message("wrong_password_pattern").send();
        }

        if (!body.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            return response.message("wrong_email_pattern").send();
        }

        res.locals.user = body;
		next();
	}
}
