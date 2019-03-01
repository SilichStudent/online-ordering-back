import { BaseRepository } from './base/BaseRepository'
import { Product } from '../models/Product';
import { Category } from '../models/Category';

export class ProductRepository extends BaseRepository<Product> {
    constructor() {
        super(Product)
    }

    public async find(limit: number, offset: number): Promise<Array<Product>> {
        const products = await this.getRepository().find({ skip: offset, take: limit });
        return products
    }

    public async findWithoutCategory(): Promise<Array<Product>> {
        const products = await this.getRepository().find({ category: null });
        return products
    }
    
    async findByCategoryId(id: string): Promise<Array<Product>> {
        const products = await this.getRepository().find();
        return products;
    }

    async findByIdArray(ids: string[]): Promise<Array<Product>> {
        const idObjects = ids.map(id => ({ id }));

        const products = await this.getRepository().find({ where: idObjects });
        return products;
    }

    async deleteByCategoryId(category: Category){
        await this.getRepository().delete({ category: category});
    }

    async delete(id: string){
        await this.getRepository().delete(id);
    }

    async update(id: string, product: Product){
        await this.getRepository().update(id, product);
        const updatedProduct = this.findById(id);
        return updatedProduct;
    }
}