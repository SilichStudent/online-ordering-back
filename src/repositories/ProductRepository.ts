import { BaseRepository } from './base/BaseRepository'
import { Product } from '../models/Product';

export class ProductRepository extends BaseRepository<Product> {
    constructor() {
        super(Product)
    }
    
        public async find(limit: number, offset: number): Promise<Array<Product>>{
            const products = await this.getRepository().find({skip: offset, take: limit});
            return products
        }
    
        public async findWithoutCAtegory(): Promise<Array<Product>>{
            const products = await this.getRepository().find({ categoryId : null });
            return products
        }
    
    async findById(id: string): Promise<Product> {
        const product = await this.getRepository().findOne(id);
        return product;
    }

    async findByCategoryId(id: string): Promise<Array<Product>> {
        const products = await this.getRepository().find({ categoryId : id });
        return products;
    }

    async create(product: Product): Promise<Product> {
        const createdProduct = await this.getRepository().save(product);
        return createdProduct;
    }

    async findByIdArray(ids: string[]): Promise<Array<Product>> {
        const idObjects = ids.map( id => ({ id: id }));

        const products = await this.getRepository().find({ where : idObjects });
        return products;
    }
}