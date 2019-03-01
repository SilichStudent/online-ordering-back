import { Router, Request, Response, NextFunction } from 'express'
import { ProductsService } from '../services/app/ProductsService'
import { ProductRepository } from '../repositories/ProductRepository';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { Role } from '../enums/Role';

export class ProductController {

    public productController: Router = Router();

    private productRepository: ProductRepository = new ProductRepository();

    private appProductsService: ProductsService = new ProductsService();
    private authMiddleware: AuthMiddleware = new AuthMiddleware();

    constructor() {
        this.productController.get('/products', this.authMiddleware.isHavePermissions([Role.MANAGER, Role.USER]), this.getProducts.bind(this));
        this.productController.post('/products', this.authMiddleware.isHavePermissions([Role.MANAGER]), this.createProduct.bind(this));

        this.productController.get('/products/:id', this.authMiddleware.isHavePermissions([Role.MANAGER, Role.USER]), this.getProduct.bind(this));
        this.productController.put('/products/:id', this.authMiddleware.isHavePermissions([Role.MANAGER]), this.update.bind(this));
        this.productController.delete('/products/:id', this.authMiddleware.isHavePermissions([Role.MANAGER]), this.delete.bind(this));
    }

    private async getProduct(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        try {
            const product = await this.productRepository.findByUuid(id);
            return res.status(200).send(product);
        } catch (err) {
            return next(err);
        }
    }

    private async getProducts(req: Request, res: Response, next: NextFunction) {
        const { limit, offset } = req.query;

        try {
            const products = await this.appProductsService.getProducts(parseInt(limit), parseInt(offset));
            return res.status(200).send(products);
        } catch (err) {
            return next(err);
        }
    }

    private async createProduct(req: Request, res: Response, next: NextFunction) {
        const product = req.body;

        try {
            const createdProduct = await this.appProductsService.create(product);
            return res.status(200).send(createdProduct);
        } catch (err) {
            return next(err);
        }
    }

    private async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        try {
            await this.productRepository.delete(id);
            return res.status(200).send({ id });
        } catch (err) {
            return next(err);
        }
    }

    private async update(req: Request, res: Response, next: NextFunction) {
        const product = req.body;
        const { id } = req.params;

        try {
            const updatedProduct = await this.appProductsService.update(id, product);
            return res.status(200).send(updatedProduct);
        } catch (err) {
            return next(err);
        }
    }
}