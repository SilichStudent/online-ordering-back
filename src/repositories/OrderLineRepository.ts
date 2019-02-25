import { BaseRepository } from './base/BaseRepository'
import { Category } from '../models/Category';
import { ObjectID } from 'mongodb';
import { ProductRepository } from './ProductRepository';
import { OrderLine } from '../models/OrderLine';

export class OrderLineRepository extends BaseRepository<OrderLine> {

    constructor() {
        super(OrderLine)
    }

    public async find(limit: number, offset: number): Promise<Array<OrderLine>> {
        const orderLines = await this.getRepository().find({ skip: offset, take: limit, order: { createdDate: "DESC" } });
        return orderLines;
    }

    public async create(orderLine: OrderLine): Promise<OrderLine>{
        const createdOrderLine = await this.getRepository().save(orderLine);
        return createdOrderLine;
    }
}