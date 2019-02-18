import { BaseRepository } from './base/BaseRepository'
import { ObjectID } from 'typeorm';
import { Product } from '../models/Product';

export class ProductRepository extends BaseRepository<Product> {
    constructor() {
        super(Product)
    }

    public async find(limit: number, offset: number): Promise<Array<Product>>{
        const products = await this.getRepository().find({skip: offset, take: limit});
        return products
    }

    async findById(id: string): Promise<Product> {
        const product = await this.getRepository().findOne(id);
        return product;
    }

    async create(product: Product): Promise<Product> {
        const createdProduct = await this.getRepository().save(product);
        return createdProduct;
    }
}