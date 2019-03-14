import { Router, Request, Response, NextFunction } from 'express';

import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { Role } from '../enums/Role';
import { OrderService } from '../services/app/OrderService';

export class OrderController{

    public orderController: Router = Router();
    private authMiddleware: AuthMiddleware = new AuthMiddleware();
    private orderService: OrderService = new OrderService();
    
    constructor(){
        this.orderController.get('/orders', this.authMiddleware.isHavePermissions([Role.USER]))
        this.orderController.post('/orders', this.authMiddleware.isHavePermissions([Role.USER]), this.createOrder.bind(this))
    }

    async getOrders(req: Request, res: Response, next: NextFunction){

    }

    async createOrder(req: any, res: Response, next: NextFunction){
        const order = req.body;
        const { currentUser } = req;

        try{
            const createdOrder = await this.orderService.createOrder(order, currentUser.uuid);
            res.status(201).send(createdOrder);
        }catch(err){
          return next(err);  
        }
    }

}