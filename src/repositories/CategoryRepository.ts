import { BaseRepository } from './base/BaseRepository'
import { Category } from '../models/Category';
import { ProductRepository } from './ProductRepository';

export class CategoryRepository extends BaseRepository<Category> {

    productRepository: ProductRepository = new ProductRepository();

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
        category.id = 'default';

        category.products = await this.productRepository.findWithoutCategory();

        return category;
    }

    async findByIdArray(ids: string[]): Promise<Array<Category>> {
        const idObjects = ids.map(id => ({ id: id }));

        const products = await this.getRepository().find({ where: idObjects, relations: ['products'] });
        return products;
    }

    async update(id: string, category: Category): Promise<Category> {
        await this.getRepository().update(id, { name: category.name });
        const updatedCategory = this.findById(id);
        return updatedCategory;
    }

    async delete(id: string): Promise<void> {
        const category = await this.findById(id);
        await this.productRepository.deleteByCategoryId(category);
        await this.getRepository().delete(id);
    }
}