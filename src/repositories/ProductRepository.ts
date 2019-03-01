import { BaseRepository } from './base/BaseRepository'
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { CategoriesService } from '../services/app/CategoriesService';

export class ProductRepository extends BaseRepository<Product> {

    private categoriesService: CategoriesService = new CategoriesService();

    constructor() {
        super(Product)
    }

    public async findWithoutCategory(): Promise<Array<Product>> {
        const products = await this.getRepository().find({ category: null });
        return products
    }
    
    async findByCategoryUuid(uuid: string): Promise<Array<Product>> {
        const category = await this.categoriesService.getByUuid(uuid);
        const products = await this.getRepository().find({ category });
        return products;
    }

    async findByUuidArray(uuids: string[]): Promise<Array<Product>> {
        const idObjects = uuids.map(id => ({ id }));

        const products = await this.getRepository().find({ where: idObjects });
        return products;
    }

    async deleteByCategory(category: Category){
        await this.getRepository().delete({ category: category});
    }

    async delete(id: string){
        await this.getRepository().delete(id);
    }

    async update(id: string, product: Product){
        await this.getRepository().update(id, product);
        const updatedProduct = this.findByUuid(id);
        return updatedProduct;
    }
}