import { Router, Request, Response, NextFunction } from 'express'
import { CategoriesService } from '../services/app/CategoriesService'
import { CategoryRepository } from '../repositories/CategoryRepository';

export class CategoriesController {

    public categoriesController: Router = Router();

    private categoriesRepository: CategoryRepository = new CategoryRepository();

    private appCategoriesService: CategoriesService = new CategoriesService();

    constructor() {
        this.categoriesController.get('/categories', this.getCategories.bind(this));
        this.categoriesController.post('/categories', this.createCategory.bind(this));

        this.categoriesController.get('/categories/:id', this.getCategory.bind(this));
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
        const product = req.body;

        try {
            const createdProduct = await this.appCategoriesService.create(product);
            return res.status(200).send(createdProduct);
        } catch (err) {
            return next(err);
        }
    }
}