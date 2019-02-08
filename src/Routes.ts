import { Router } from "express"
import { UserController } from "./controllers/UsersController"

export class Routes {
    public routes: Router = Router();

    constructor() {
        this.routes.use('/', new UserController().userController);
    }
}
