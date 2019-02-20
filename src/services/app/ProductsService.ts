import { ProductRepository } from '../../repositories/ProductRepository';
import { Product } from '../../models/Product';
import { CategoryRepository } from '../../repositories/CategoryRepository';

export class ProductsService{

    productRepository: ProductRepository = new ProductRepository();
    categoryRepository: CategoryRepository = new CategoryRepository();

    async getProducts(limit: number, offset: number): Promise<object>{
        const products = await this.productRepository.find(limit, offset);
        const count = await this.productRepository.count();
        return{
            list: products,
            offset: offset,
            limit: products.length,
            count
        }
    }

    async create(body): Promise<Product>{
        const product = new Product();
        product.name=body.name;
        product.image=body.image;
        product.description=body.description;
        product.categoryId = body.categoryId;

        const createdProduct = await this.productRepository.create(product);
        return createdProduct;
    }
}