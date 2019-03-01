import { OrderLineRepository } from '../../repositories/OrderLineRepository';
import { ProductRepository } from '../../repositories/ProductRepository';
import { CategoryRepository } from '../../repositories/CategoryRepository';
import { OrderLine } from '../../models/OrderLine';

export class OrderLinesService {

    orderLineRepository: OrderLineRepository = new OrderLineRepository();
    productRepository: ProductRepository = new ProductRepository();
    categoryRepository: CategoryRepository = new CategoryRepository();

    async getOrderLines(limit: number, offset: number): Promise<object> {
        let orderLines: any[] = await this.orderLineRepository.find(limit, offset);
        const count = await this.orderLineRepository.count();
        return {
            list: orderLines,
            offset: offset,
            limit: orderLines.length,
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

        const catIdsArray = body.categories.map( cat => cat.id ); 
        const prodIdsArray = body.products.map( prod => prod.id );

        const categories = await this.categoryRepository.findByIdArray(catIdsArray);
        const products = await this.productRepository.findByIdArray(prodIdsArray);

        orderLine.categories = categories;
        orderLine.products = products;

        const createdOrderLine = await this.orderLineRepository.create(orderLine);
        return createdOrderLine;
    }
}