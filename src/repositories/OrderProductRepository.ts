import { BaseRepository } from './base/BaseRepository';
import { OrderProduct } from '../models/OrderProduct';

export class OrderProductRepository extends BaseRepository<OrderProduct>{
    
    constructor(){
        super(OrderProduct)
    }

    public async createOrderProduct(orderProducts: OrderProduct[]){
        const createdOrderProducts = await this.getRepository().save(orderProducts);
        return createdOrderProducts;
    }
}