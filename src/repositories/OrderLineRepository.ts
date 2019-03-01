import { BaseRepository } from './base/BaseRepository'
import { Category } from '../models/Category';
import { ProductRepository } from './ProductRepository';
import { OrderLine } from '../models/OrderLine';

export class OrderLineRepository extends BaseRepository<OrderLine> {

    constructor() {
        super(OrderLine)
    }

    public async find(limit: number, offset: number): Promise<Array<OrderLine>> {
        const orderLines = await this.getRepository().createQueryBuilder("order_lines")
                .skip(offset)
                .take(limit)
                .orderBy("order_lines.created_date")
                .innerJoin("order_lines.categories", "category")
                .innerJoin("category.products","product")
                .innerJoin("order_lines.products","products")
                .getMany()
        // const orderLines = await this.getRepository().find({ skip: offset, take: limit, order: { createdDate: "DESC" }, relations:['categories', 'products'] });
        return orderLines;
    }
}