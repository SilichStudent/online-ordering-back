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

        const categoriesTree = await this.categoryRepository.find();

        orderLines = orderLines.map(line => {
            line.categories = categoriesTree.filter(category => line.categories.some(categoryId => categoryId === category.id.toString()));

            const productsObj = [];

            line.products.forEach(productId => {
                categoriesTree.forEach(category => {
                    const productObj = category.products.filter(product => product.id.toString() == productId)[0];
                    if (productObj) {
                        productsObj.push(productObj);
                    }
                });
            });

            line.products = productsObj;

            return line;
        })

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
        orderLine.published = body.published;
        orderLine.categories = body.categories;
        orderLine.products = body.products;

        const createdOrderLine = await this.orderLineRepository.create(orderLine);
        return createdOrderLine;
    }
}