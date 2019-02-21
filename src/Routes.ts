import { Router } from "express"
import { UserController } from "./controllers/UsersController"
import { ProductController } from "./controllers/ProductsController"
import { CategoriesController } from "./controllers/CategoriesController"

export class Routes {
    public routes: Router = Router();

    constructor() {
        this.routes.use('/', new UserController().userController);
        this.routes.use('/', new ProductController().productController);
        this.routes.use('/', new CategoriesController().categoriesController);
        this.routes.put('/', (req,res,next) => { 
            console.log("ok");
            return res.status(200).send();
        });
    }
}
