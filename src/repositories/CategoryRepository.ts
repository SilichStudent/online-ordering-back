import { BaseRepository } from './base/BaseRepository'
import { Category } from '../models/Category';
import { ProductsService } from '../services/app/ProductsService';

export class CategoryRepository extends BaseRepository<Category> {

    productsService: ProductsService = new ProductsService();

    constructor() {
        super(Category)
    }

    public async find(): Promise<Array<Category>> {
        const categories: Category[] = await this.getRepository().find({ relations: ['products'] });

        const productsWithoutCategory = await this.addProducts();

        categories.push(productsWithoutCategory);

        return categories
    }

    private async addProducts(): Promise<Category> {

        const category = new Category();

        category.name = 'default';
        category.uuid = 'default';

        category.products = await this.productsService.findWithoutCategory();

        return category;
    }

    async findByUuidArray(uuids: string[]): Promise<Array<Category>> {
        const uuidObjects = uuids.map(uuid => ({ uuid: uuid }));

        const products = await this.getRepository().find({ where: uuidObjects, relations: ['products'] });
        return products;
    }

    async update(uuid: string, category: Category): Promise<Category> {
        await this.getRepository().update(uuid, { name: category.name });
        const updatedCategory = this.findByUuid(uuid);
        return updatedCategory;
    }

    async delete(uuid: string): Promise<void> {
        await this.productsService.deleteByCategoryUuid(uuid);
        await this.getRepository().delete(uuid);
    }
}