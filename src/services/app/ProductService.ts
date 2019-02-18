import { UserRepository } from '../../repositories/UserRepository'
import { ProductRepository } from '../../repositories/ProductRepository';

export class ProductService{

    productRepository: ProductRepository = new ProductRepository();

}