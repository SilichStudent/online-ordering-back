import { Product } from '../../models/Product';
import { CategoryRepository } from '../../repositories/CategoryRepository';
import { Category } from '../../models/Category';

export class CategoriesService {

    categoryRepository: CategoryRepository = new CategoryRepository();

    async getProducts(limit: number, offset: number): Promise<object> {
        const categories = await this.categoryRepository.find();
        const count = await this.categoryRepository.count();
        return {
            list: categories,
            offset: offset,
            limit: limit,
            count
        }
    }

    async create(body): Promise<Category> {
        const category = new Category();

        category.name = body.name;

        const createdCategory = await this.categoryRepository.create(category);
        return createdCategory;
    }
    
    async update(id, body): Promise<Category> {
        const category = new Category();

        category.name = body.name;

        const updatedCategory = await this.categoryRepository.update(id, category);
        return updatedCategory;
    }

    async delete(id): Promise<void> {
        await this.categoryRepository.delete(id);
    }
}