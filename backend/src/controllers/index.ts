import AppController from "./AppController";
import AuthController from "./Auth/AuthController";

const ControllerList: AppController[] = [new AuthController()];
export default ControllerList;
