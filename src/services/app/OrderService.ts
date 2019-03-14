import { Order } from "../../models/Order";
import { OrderRepository } from "../../repositories/OrderRepository";
import { OrderProductRepository } from "../../repositories/OrderProductRepository";
import { OrderProduct } from "../../models/OrderProduct";
import { RedisService } from "../RedisService";
import { CartService } from "../CartService";


export class OrderService {

    private orderRepository: OrderRepository = new OrderRepository();
    private orderProductRepository: OrderProductRepository = new OrderProductRepository();
    private cartService: CartService = new CartService();

    public async createOrder(body, userUuid){
        const order = new Order();
        order.userUuid = userUuid;

        const createdOrder = await this.orderRepository.create(order);

        const orderProducts = body.map( product => {
            const orderProduct = new OrderProduct();
            orderProduct.quantity = parseInt(product.quantity);
            orderProduct.orderUuid = createdOrder.uuid;
            orderProduct.productUuid = product.uuid;
            return orderProduct;
        });

        await this.cartService.deleteCart(userUuid);

        const createdOrderProducts = await this.orderProductRepository.createOrderProduct(orderProducts);
        return createdOrderProducts;
    }
}