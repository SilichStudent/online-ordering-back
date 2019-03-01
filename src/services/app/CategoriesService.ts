import { Product } from '../../models/Product';
import { CategoryRepository } from '../../repositories/CategoryRepository';
import { Category } from '../../models/Category';

export class CategoriesService {

    categoryRepository: CategoryRepository = new CategoryRepository();

    async getCategories(): Promise<object> {
        const categories = await this.categoryRepository.find();
        const count = await this.categoryRepository.count();
        return {
            list: categories,
            count
        }
    }

    async getByUuid(uuid: string): Promise<Category>{
        const category = this.categoryRepository.findByUuid(uuid);
        return category;
    }

    async create(body): Promise<Category> {
        const category = new Category();

        category.name = body.name;

        const createdCategory = await this.categoryRepository.create(category);
        return createdCategory;
    }
    
    public async update(id, body): Promise<Category> {
        const category = new Category();

        category.name = body.name;

        const updatedCategory = await this.categoryRepository.update(id, category);
        return updatedCategory;
    }

    public async delete(id): Promise<void> {
        await this.categoryRepository.delete(id);
    }

    public async getByUuidArray(uuids: Array<string>): Promise<Array<Category>>{
        const categories = await this.categoryRepository.findByUuidArray(uuids);
        return categories;
    }
}