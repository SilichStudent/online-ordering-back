import { RedisService } from './RedisService'
import { CustomError } from '../errors/CustomError';
import { ProductsService } from './app/ProductsService';

export class CartService {

    private static CART_KEY = "USER_CART_"

    private redisService: RedisService = new RedisService();
    private productsService: ProductsService = new ProductsService();

    public async addProductToCart(cartObj: any, userUuid: string) {
        if (!cartObj || !cartObj.productUuid || !cartObj.quantity) {
            throw new CustomError(400, "productId and quantity is required");
        }

        await this.redisService.hset(this.getUserCartKey(userUuid), cartObj.productUuid, cartObj.quantity);
    }

    public async getCart(userUuid: string) {
        const cartMap = await this.redisService.hgetall(this.getUserCartKey(userUuid));

        if (!cartMap) {
            return null;
        }

        const products = await this.productsService.getByUuidArray(Object.keys(cartMap));

        return products.map(product => {
            return {
                ...product,
                quantity: cartMap[product.uuid]
            }
        })
    }
    public async deleteCart(userUuid: string): Promise<number> {
        const deleted = this.redisService.del(this.getUserCartKey(userUuid));
        return deleted;
    }

    private getUserCartKey(userUuid: string): string {
        return CartService.CART_KEY + userUuid;
    }

}