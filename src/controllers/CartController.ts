import { Router, Request, Response, NextFunction } from 'express';

import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { Role } from '../enums/Role';
import { CartService } from '../services/CartService';

export class CartController{

    public cartController: Router = Router();

    private authMiddleware: AuthMiddleware = new AuthMiddleware();
    private cartService: CartService = new CartService();

    constructor(){
        this.cartController.get('/cart', this.authMiddleware.isHavePermissions([Role.USER]), this.getCart.bind(this));
        this.cartController.post('/cart', this.authMiddleware.isHavePermissions([Role.USER]), this.addProductToCart.bind(this));
    }

    private async addProductToCart(req: any, res: Response, next: NextFunction){
        const { currentUser } = req;
        const cartObject = req.body;

        try {
            await this.cartService.addProductToCart(cartObject, currentUser.uuid);
            return res.status(200).send(cartObject);
        } catch(err){
            return next(err);
        }
    }

    private async getCart(req: any, res: Response, next: NextFunction){
        const { currentUser } = req;
        
        try {
            const cart = await this.cartService.getCart(currentUser.uuid);
            return res.status(200).send(cart);
        } catch(err){
            return next(err);
        }
    }
}