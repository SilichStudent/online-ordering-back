import { OrderLineRepository } from '../../repositories/OrderLineRepository';
import { OrderLine } from '../../models/OrderLine';
import { ProductsService } from './ProductsService';
import { CategoriesService } from './CategoriesService';

export class OrderLinesService {

    orderLineRepository: OrderLineRepository = new OrderLineRepository();
    productsService: ProductsService = new ProductsService();
    categoriesService: CategoriesService = new CategoriesService();

    async getOrderLines(limit: number, offset: number): Promise<object> {
        let orderLines: OrderLine[] = await this.orderLineRepository.findTree(limit, offset);

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
        orderLine.published = false;;

        const catUuidsArray = body.categories.map( cat => cat.uuid ); 
        const prodUuidsArray = body.products.map( prod => prod.uuid );

        const categories = await this.categoriesService.getByUuidArray(catUuidsArray);
        const products = await this.productsService.getByUuidArray(prodUuidsArray);

        orderLine.categories = categories;
        orderLine.products = products;

        const createdOrderLine = await this.orderLineRepository.create(orderLine);
        return createdOrderLine;
    }
}