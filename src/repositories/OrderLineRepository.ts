import { BaseRepository } from './base/BaseRepository'
import { OrderLine } from '../models/OrderLine';

export class OrderLineRepository extends BaseRepository<OrderLine> {

    constructor() {
        super(OrderLine)
    }

    public async find(limit: number, offset: number): Promise<Array<OrderLine>> {
        const orderLines = await this.getRepository().find({ skip: offset, take: limit, order: { createdDate: "DESC" }, relations: ['categories', 'products'] });
        return orderLines;
    }

    public async findPublished(): Promise<OrderLine> {
        const orderLine = await this.getRepository().findOne({ relations: ['categories', 'products'], where: { published: true } });
        return orderLine;
    }

    public async findByUuid(uuid: string): Promise<OrderLine> {
        const orderLine = await this.getRepository().findOne({ relations: ['categories', 'products'], where: { uuid: uuid } });
        return orderLine;
    }

    public async update(uuid: string, orderLine): Promise<OrderLine> {
        await this.getRepository().update(uuid, {
            name: orderLine.name,
            description: orderLine.description,
            startTime: orderLine.startTime,
            endTime: orderLine.endTime,
            isActive: orderLine.isActive,
            published: orderLine.published
        });
        const orderLineUpd = await this.findByUuid(uuid);
        return orderLineUpd;
    }
}