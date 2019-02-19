import { Router, Request, Response, NextFunction } from 'express'
import { ProductsService } from '../services/app/ProductsService'
import { ProductRepository } from '../repositories/ProductRepository';

export class ProductController {

    public productController: Router = Router();

    private productRepository: ProductRepository = new ProductRepository();

    private appProductsService: ProductsService = new ProductsService();

    constructor() {
        this.productController.get('/products', this.getProducts.bind(this));
        this.productController.post('/products', this.createProduct.bind(this));

        this.productController.get('/products/:id', this.getProduct.bind(this));
    }

    private async getProduct(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;

        try{
            const product = await this.productRepository.findById(id);
            return res.status(200).send(product);
        } catch(err){
            return next(err);
        }
    }

    private async getProducts(req: Request, res: Response, next: NextFunction){
        const { limit, offset } = req.query;

        try{
            const products = await this.appProductsService.getProducts(limit, offset);
            return res.status(200).send(products);
        } catch(err){
            return next(err);
        }
    }

    private async createProduct(req: Request, res: Response, next: NextFunction){
        const product = req.body;

        try{
            const createdProduct = await this.appProductsService.create(product);
            return res.status(200).send(createdProduct);
        } catch(err){
            return next(err);
        }
    }
}