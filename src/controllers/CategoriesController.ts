import { Router, Request, Response, NextFunction } from 'express';
import { CategoriesService } from '../services/app/CategoriesService';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { Role } from '../enums/Role';

export class CategoriesController {

    public categoriesController: Router = Router();

    private categoriesService: CategoriesService = new CategoriesService();
    private authMiddleware: AuthMiddleware = new AuthMiddleware();

    constructor() {
        this.categoriesController.get('/categories', this.authMiddleware.isHavePermissions([Role.MANAGER, Role.USER]), this.getCategories.bind(this));
        this.categoriesController.get('/categories/tree', this.authMiddleware.isHavePermissions([Role.MANAGER, Role.USER]), this.getCategoriesTree.bind(this));
        this.categoriesController.post('/categories', this.authMiddleware.isHavePermissions([Role.MANAGER]), this.createCategory.bind(this));

        this.categoriesController.get('/categories/:id', this.authMiddleware.isHavePermissions([Role.MANAGER, Role.USER]), this.getCategory.bind(this));
        this.categoriesController.put('/categories/:id', this.authMiddleware.isHavePermissions([Role.MANAGER]), this.updateCategory.bind(this));
        this.categoriesController.delete('/categories/:id', this.authMiddleware.isHavePermissions([Role.MANAGER]), this.delete.bind(this));
    }

    private async getCategory(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        try {
            const product = await this.categoriesService.getByUuid(id);
            return res.status(200).send(product);
        } catch (err) {
            return next(err);
        }
    }

    private async getCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await this.categoriesService.getCategories();
            return res.status(200).send(categories);
        } catch (err) {
            return next(err);
        }
    }

    private async getCategoriesTree(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await this.categoriesService.getCategoriesTree();
            return res.status(200).send(categories);
        } catch (err) {
            return next(err);
        }
    }

    private async createCategory(req: Request, res: Response, next: NextFunction) {
        const category = req.body;

        try {
            const createdCategory = await this.categoriesService.create(category);
            return res.status(200).send(createdCategory);
        } catch (err) {
            return next(err);
        }
    }

    private async updateCategory(req: Request, res: Response, next: NextFunction) {
        const product = req.body;
        const { id } = req.params;

        try {
            const createdProduct = await this.categoriesService.update(id, product);
            return res.status(200).send(createdProduct);
        } catch (err) {
            return next(err);
        }
    }

    private async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        try {
            await this.categoriesService.delete(id);
            return res.status(200).send({ uuid: id });
        } catch (err) {
            return next(err);
        }
    }
}