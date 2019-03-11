import { BaseRepository } from './base/BaseRepository'
import { Category } from '../models/Category';

export class CategoryRepository extends BaseRepository<Category> {

    constructor() {
        super(Category)
    }

    public async find(): Promise<Array<Category>> {
        const categories: Category[] = await this.getRepository().find();
        return categories;
    }

    public async findTree(): Promise<Array<Category>> {
        const categories: Category[] = await this.getRepository().find({ relations: ['products'] });
        return categories
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
        await this.getRepository().delete(uuid);
    }
}