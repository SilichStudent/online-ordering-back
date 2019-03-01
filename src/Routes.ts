import { Router } from "express"
import { UserController } from "./controllers/UsersController"
import { ProductController } from "./controllers/ProductsController"
import { CategoriesController } from "./controllers/CategoriesController"
import { OrderLinesController } from "./controllers/OrderLinesController"
import { ManagersController } from "./controllers/ManagersController"

export class Routes {
    public routes: Router = Router();

    constructor() {
        this.routes.use('/', new UserController().userController);
        this.routes.use('/', new ProductController().productController);
        this.routes.use('/', new CategoriesController().categoriesController);
        this.routes.use('/', new OrderLinesController().orderLinesController);
        this.routes.use('/', new ManagersController().managersController);
    }
}
