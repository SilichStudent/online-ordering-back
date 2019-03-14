import { BaseRepository } from './base/BaseRepository'
import { Order } from '../models/Order';
import { Product } from '../models/Product';

export class OrderRepository extends BaseRepository<Order>{

    constructor(){
        super(Order)
    }

    public async createOrder(order){
        const createdOrder = await this.getRepository().create(order);
        return createdOrder;
    }

}