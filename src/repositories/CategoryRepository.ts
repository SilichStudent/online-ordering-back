import { BaseRepository } from './base/BaseRepository'
import { Category } from '../models/Category';
import { QueryBuilder } from 'typeorm'
import { ProductRepository } from './ProductRepository';

export class CategoryRepository extends BaseRepository<Category> {

    productRepository: ProductRepository = new ProductRepository();

    constructor() {
        super(Category)
    }

    public async find(limit: number, offset: number): Promise<Array<Category>>{
        const categories = await this.getRepository().find({skip: offset, take: limit});

        await this.addProducts(categories);

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

    private async addProducts(categories : Category[]){
        for(let i = 0 ; i < categories.length; i++ ){
            const products = await this.productRepository.findByCategoryId(categories[i].id.toString());
            categories[i].products = products;
        }
    }
}