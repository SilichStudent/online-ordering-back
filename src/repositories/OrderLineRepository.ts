import { BaseRepository } from './base/BaseRepository'
import { Category } from '../models/Category';
import { ProductRepository } from './ProductRepository';
import { OrderLine } from '../models/OrderLine';
import { LessThan, MoreThanOrEqual } from 'typeorm';

export class OrderLineRepository extends BaseRepository<OrderLine> {

    constructor() {
        super(OrderLine)
    }

    public async find(limit: number, offset: number): Promise<Array<OrderLine>> {
        const orderLines  = await this.getRepository().find({ skip: offset, take: limit, order: { createdDate: "DESC" }, relations:['categories', 'products'] });
        return orderLines;
    }

    public async findPublished(): Promise<OrderLine> {
        const orderLine = await this.getRepository().findOne({ relations: ['categories', 'products'], where: { published: true} });
        return orderLine;
    }
}