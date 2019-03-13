import { BaseRepository } from './base/BaseRepository'
import { Product } from '../models/Product';
import { Category } from '../models/Category';

export class ProductRepository extends BaseRepository<Product> {

    constructor() {
        super(Product)
    }

    public async findAll(): Promise<Array<Product>>{
        const products = await this.getRepository().find();
        return products;
    }

    public async findWithoutCategory(): Promise<Array<Product>> {
        const products = await this.getRepository().find({ categoryUuid: null });
        return products
    }

    public async findByCategory(uuid: string): Promise<Array<Product>> {
        const products = await this.getRepository().find({ categoryUuid: uuid });
        return products
    }

    async findByUuidArray(uuids: string[]): Promise<Array<Product>> {
        const idObjects = uuids.map(id => ({ uuid: id }));

        const products = await this.getRepository().find({ where: idObjects });
        return products;
    }

    async deleteByCategory(categoryUuid: string) {
        await this.getRepository().delete({ categoryUuid });
    }

    async delete(uuid: string) {
        await this.getRepository().delete(uuid);
    }

    async update(uuid: string, product: Product) {
        await this.getRepository().update(uuid, product);
        const updatedProduct = this.findByUuid(uuid);
        return updatedProduct;
    }
}