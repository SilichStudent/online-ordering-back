import { Router, Request, Response, NextFunction } from 'express'
import { CategoriesService } from '../services/app/CategoriesService'
import { CategoryRepository } from '../repositories/CategoryRepository';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { Role } from '../enums/Role';

export class CategoriesController {

    public categoriesController: Router = Router();

    private categoriesRepository: CategoryRepository = new CategoryRepository();

    private appCategoriesService: CategoriesService = new CategoriesService();
    private authMiddleware: AuthMiddleware = new AuthMiddleware();

    constructor() {
        this.categoriesController.get('/categories', this.getCategories.bind(this));
        this.categoriesController.post('/categories', this.authMiddleware.isHavePermissions([Role.MANAGER]), this.createCategory.bind(this));

        this.categoriesController.get('/categories/:id', this.getCategory.bind(this));
        this.categoriesController.put('/categories/:id', this.updateCategory.bind(this));
        this.categoriesController.delete('/categories/:id', this.delete.bind(this));
    }

    private async getCategory(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        try {
            const product = await this.categoriesRepository.findById(id);
            return res.status(200).send(product);
        } catch (err) {
            return next(err);
        }
    }

    private async getCategories(req: Request, res: Response, next: NextFunction) {
        const { limit, offset } = req.query;

        try {
            const products = await this.appCategoriesService.getProducts(parseInt(limit), parseInt(offset));
            return res.status(200).send(products);
        } catch (err) {
            return next(err);
        }
    }

    private async createCategory(req: Request, res: Response, next: NextFunction) {
        const category = req.body;

        try {
            const createdCategory = await this.appCategoriesService.create(category);
            return res.status(200).send(createdCategory);
        } catch (err) {
            return next(err);
        }
    }

    private async updateCategory(req: Request, res: Response, next: NextFunction) {
        const product = req.body;
        const { id } = req.params;

        try {
            const createdProduct = await this.appCategoriesService.update(id, product);
            return res.status(200).send(createdProduct);
        } catch (err) {
            return next(err);
        }
    }

    private async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        try {
            await this.appCategoriesService.delete(id);
            return res.status(200).send({ id });
        } catch (err) {
            return next(err);
        }
    }
}