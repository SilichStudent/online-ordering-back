import { Router, Request, Response, NextFunction } from 'express'
import { ProductService } from '../services/app/ProductService'
import { ProductRepository } from '../repositories/ProductRepository';

export class ProductController {

    public productController: Router = Router();

    private productRepository: ProductRepository = new ProductRepository();

    private appProductService: ProductService = new ProductService();

    constructor() {
        this.productController.get('/users/:id', this.getProducts.bind(this));
    }

    private async getProducts(req: Request, res: Response, next: NextFunction){

    }
}