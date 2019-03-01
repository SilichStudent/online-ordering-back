import { ProductRepository } from '../../repositories/ProductRepository';
import { Product } from '../../models/Product';
import { CategoriesService } from './CategoriesService';

export class ProductsService {

    productRepository: ProductRepository = new ProductRepository();
    categoriesService: CategoriesService = new CategoriesService();

    async getProducts(limit: number, offset: number): Promise<object> {
        const products = await this.productRepository.find(limit, offset);
        const count = await this.productRepository.count();
        return {
            list: products,
            offset: offset,
            limit,
            count
        }
    }

    async create(body): Promise<Product> {
        const product = new Product();
        product.name = body.name;
        product.image = body.image;
        product.description = body.description;

        if (body.categoryUuid) {
            const category = await this.categoriesService.getByUuid(body.categoryUuid);
            product.category = category;
        }


        const createdProduct = await this.productRepository.create(product);
        return createdProduct;
    }

    async update(id: string,body): Promise<Product> {
        const product = new Product();
        product.name = body.name;
        product.image = body.image;
        product.description = body.description;

        if (body.categoryUuid) {
            const category = await this.categoriesService.getByUuid(body.categoryUuid);
            product.category = category;
        }

        const updatedProduct = await this.productRepository.update(id, product);
        return updatedProduct;
    }

    public async findWithoutCategory(): Promise<Array<Product>> {
        const products = await this.productRepository.findWithoutCategory();
        return products
    }

    async deleteByCategoryUuid(uuid: string){
        const category = await this.categoriesService.getByUuid(uuid);
        await this.productRepository.deleteByCategory( category );
    }

    public async getByUuidArray(uuids: Array<string>): Promise<Array<Product>>{
        const products = await this.productRepository.findByUuidArray(uuids);
        return products;
    }
}