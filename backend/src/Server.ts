import * as cors from "cors";
import * as express from "express";
import helmet from "helmet";
import * as morgan from "morgan";
import { AppConfigs } from "../configs/config";
import ControllerList from "./controllers";
import AppController from "./controllers/AppController";
import { IAppNextFuction, IAppRequest, IAppResponse } from "./interfaces/base/AppBase";
import AppResponse from "./shared/AppResponse";
import { AppLogStream, Logger } from "./utils/Logger";

export default class Server {
	private _app: express.Application;
	private readonly PORT: number;
	private _whiteList: string[];

	constructor() {
		this._app = express();
		this.PORT = AppConfigs.PORT;
		this._whiteList = [];
	}

	initializeGlobalMiddlewares() {
		this._app.use(express.json()); // parsing application/json
		this._app.use(express.urlencoded({ extended: true }));
		this._app.use(helmet());
		this._app.use(
			cors({
				origin: AppConfigs.AUTH_CLIENT_URL,
				// origin: function (origin, callback) {
				//     callback(null, true);
				// },
				credentials: true,
				methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
				allowedHeaders: [
					"Origin",
					"X-Requested-With",
					"Content-Type",
					"Accept",
					"Authorization",
				],
			}),
		);

		this._app.use(
			morgan("combined", {
				stream: new AppLogStream(),
			}),
		);
	}

	initializeControllers() {
		ControllerList.forEach((controller: AppController) => {
			this._app.use("/", controller.router);
		});
	}

	initializeErrorHandlerMiddlewares() {
		this._app.use((req: IAppRequest, res: IAppResponse, next: IAppNextFuction) => {
			new AppResponse(res).sendNotFound();
		});

		this._app.use((err: any, req: IAppRequest, res: IAppResponse, next: IAppNextFuction) => {
			console.log(err);
			new AppResponse(res).sendInternalError();
		});
	}

	start() {
		this.initializeGlobalMiddlewares();
		this.initializeControllers();
		this.initializeErrorHandlerMiddlewares();
		this._app.listen(this.PORT, () => {
			Logger.info(`Server is listening on ${AppConfigs.APP_URL}:${this.PORT}`);
		});
	}
}
