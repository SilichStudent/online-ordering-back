import { Router, Request, Response, NextFunction } from 'express';

import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { Role } from '../enums/Role';

export class OrderController{

    public orderController: Router = Router();
    private authMiddleware: AuthMiddleware = new AuthMiddleware();
    
    constructor(){
        this.orderController.get('/orders', this.authMiddleware.isHavePermissions([Role.USER]))
    }

    async getOrders(req: Request, res: Response, next: NextFunction){

    }

    async createOrder(req: Request, res: Response, next: NextFunction){
        const order = req.body;

        try{
            
        }catch(err){
          return next(err);  
        }
    }

}