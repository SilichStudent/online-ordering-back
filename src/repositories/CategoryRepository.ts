import { BaseRepository } from './base/BaseRepository'
import { Category } from '../models/Category';

export class CategoryRepository extends BaseRepository<Category> {
    constructor() {
        super(Category)
    }

    public async find(limit: number, offset: number): Promise<Array<Category>>{
        const category = await this.getRepository().find({skip: offset, take: limit, relations: ['products']});
        return category
    }

    async findById(id: string): Promise<Category> {
        const category = await this.getRepository().findOne(id, { relations : ['products']});
        return category;
    }

    async create(category: Category): Promise<Category> {
        const createdCategory = await this.getRepository().save(category);
        return createdCategory;
    }
}