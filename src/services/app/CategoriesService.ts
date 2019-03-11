import { CategoryRepository } from '../../repositories/CategoryRepository';
import { Category } from '../../models/Category';
import { ProductsService } from './ProductsService';

export class CategoriesService {

    categoryRepository: CategoryRepository = new CategoryRepository();
    productsService: ProductsService = new ProductsService();

    async getCategories(): Promise<object> {
        const categories = await this.categoryRepository.find();

        const count = await this.categoryRepository.count();
        return {
            list: categories,
            count
        }
    }

    async getCategoriesTree(): Promise<object> {
        const categories = await this.categoryRepository.findTree();

        const productsWithoutCategory = await this.addProducts();
        categories.push(productsWithoutCategory);

        const count = await this.categoryRepository.count();
        return {
            list: categories,
            count
        }
    }

    private async addProducts(): Promise<Category> {

        const category = new Category();

        category.name = 'default';
        category.uuid = 'default';

        category.products = await this.productsService.findWithoutCategory();

        return category;
    }

    async getByUuid(uuid: string): Promise<Category> {
        const category = this.categoryRepository.findByUuid(uuid);
        return category;
    }

    async create(body): Promise<Category> {
        const category = new Category();

        category.name = body.name;

        const createdCategory = await this.categoryRepository.create(category);
        return createdCategory;
    }

    public async update(uuid, body): Promise<Category> {
        const category = new Category();

        category.name = body.name;

        const updatedCategory = await this.categoryRepository.update(uuid, category);
        return updatedCategory;
    }

    public async delete(uuid): Promise<void> {
        await this.categoryRepository.delete(uuid);
    }

    public async getByUuidArray(uuids: Array<string>): Promise<Array<Category>> {
        const categories = await this.categoryRepository.findByUuidArray(uuids);
        return categories;
    }
}