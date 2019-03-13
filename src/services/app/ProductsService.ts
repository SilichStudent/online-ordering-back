import { ProductRepository } from '../../repositories/ProductRepository';
import { Product } from '../../models/Product';
import { CategoriesService } from './CategoriesService';

export class ProductsService {

    productRepository: ProductRepository = new ProductRepository();

    async getProducts(): Promise<object> {
        const products = await this.productRepository.findAll();
        const count = await this.productRepository.count();
        return {
            list: products,
            count
        }
    }

    async getProductsByCategory(uuid: string): Promise<object>{
        let products: Product[]; 

        if(uuid === 'default'){
            products = await this.productRepository.findWithoutCategory();   
        } else {
            products = await this.productRepository.findByCategory(uuid);     
        }

        return {
            list: products,
            count: products.length
        }
    }

    async create(body): Promise<Product> {
        const product = new Product();
        product.name = body.name;
        product.image = body.image;
        product.description = body.description;
        product.categoryUuid = body.categoryUuid;

        const createdProduct = await this.productRepository.create(product);
        return createdProduct;
    }

    async update(uuid: string, body): Promise<Product> {
        const product = new Product();
        product.name = body.name;
        product.image = body.image;
        product.description = body.description;
        product.categoryUuid = body.categoryUuid;

        const updatedProduct = await this.productRepository.update(uuid, product);
        return updatedProduct;
    }

    public async findWithoutCategory(): Promise<Array<Product>> {
        const products = await this.productRepository.findWithoutCategory();
        return products
    }

    async deleteByCategoryUuid(categoryUuid: string) {
        await this.productRepository.deleteByCategory(categoryUuid);
    }

    public async getByUuidArray(uuids: Array<string>): Promise<Array<Product>> {
        const products = await this.productRepository.findByUuidArray(uuids);
        return products;
    }
}