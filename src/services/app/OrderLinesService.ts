import { OrderLineRepository } from '../../repositories/OrderLineRepository';
import { OrderLine } from '../../models/OrderLine';
import { ProductsService } from './ProductsService';
import { CategoriesService } from './CategoriesService';

export class OrderLinesService {

    orderLineRepository: OrderLineRepository = new OrderLineRepository();
    productsService: ProductsService = new ProductsService();
    categoriesService: CategoriesService = new CategoriesService();

    async getOrderLines(limit: number, offset: number): Promise<object> {
        let orderLines: OrderLine[] = await this.orderLineRepository.find(limit, offset);

        for (let i = 0; i < orderLines.length; i++) {
            const orderLine = orderLines[i];
            const catUuids = orderLine.categories.map( cat=> cat.uuid);

            orderLine.categories = await this.categoriesService.getByUuidArray(catUuids);
        }

        const count = await this.orderLineRepository.count();
        return {
            list: orderLines,
            offset: offset,
            limit: limit,
            count
        }
    }

    async create(body): Promise<OrderLine> {
        const orderLine = new OrderLine();

        orderLine.name = body.name;
        orderLine.description = body.description;
        orderLine.startTime = new Date(body.startTime);
        orderLine.endTime = new Date(body.endTime);
        orderLine.isActive = body.isActive;
        orderLine.published = true;

        const catUuidsArray = body.categories.map( cat => cat.uuid ); 
        const prodUuidsArray = body.products.map( prod => prod.uuid );

        const categories = await this.categoriesService.getByUuidArray(catUuidsArray);
        const products = await this.productsService.getByUuidArray(prodUuidsArray);

        orderLine.categories = categories;
        orderLine.products = products;

        const createdOrderLine = await this.orderLineRepository.create(orderLine);
        return createdOrderLine;
    }

    public async update(uuid, body): Promise<OrderLine>{
        const orderLine = await this.orderLineRepository.update(uuid, body);
        return orderLine;
    }

    public async getPublished(): Promise<OrderLine>{
        const orderLine = await this.orderLineRepository.findPublished();
        return orderLine;
    }

    public async getByUuid(uuid: string): Promise<OrderLine>{
        const orderLine = await this.orderLineRepository.findByUuid(uuid);
        return orderLine;
    }

    public async delete(uuid: string): Promise<void>{
        await this.orderLineRepository.delete(uuid);
    }
}