import { BaseRepository } from './base/BaseRepository'
import { Category } from '../models/Category';
import { ObjectID } from 'bson';
import { ProductRepository } from './ProductRepository';

export class CategoryRepository extends BaseRepository<Category> {

    productRepository: ProductRepository = new ProductRepository();

    constructor() {
        super(Category)
    }

    public async find(limit: number, offset: number): Promise<Array<Category>> {
        const categories: any[] = await this.getRepository().find();

        const productsWithoutCategory = await this.addProducts(categories);

        categories.push(productsWithoutCategory);

        return categories
    }

    async findById(id: string): Promise<Category> {
        const category = await this.getRepository().findOne(id);
        return category;
    }

    async create(category: Category): Promise<Category> {
        const createdCategory = await this.getRepository().save(category);
        return createdCategory;
    }

    private async addProducts(categories: Category[]) {
        for (let i = 0; i < categories.length; i++) {
            const products = await this.productRepository.findByCategoryId(categories[i].id.toString());
            categories[i].products = products;
        }

        const productsWithoutCategory = {
            name: 'default',
            id: new ObjectID(),
            products: undefined
        }

        productsWithoutCategory.products = await this.productRepository.findWithoutCategory();

        return productsWithoutCategory;
    }

    async findByIdArray(ids: string[]): Promise<Array<Category>> {
        const idObjects = ids.map(id => ({ id: new ObjectID(id) }));

        const products = await this.getRepository().find({ where: idObjects });
        return products;
    }
}