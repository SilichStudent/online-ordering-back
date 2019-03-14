import { Router, Request, Response, NextFunction } from 'express';
import { OrderLinesService } from '../services/app/OrderLinesService';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { Role } from '../enums/Role';

export class OrderLinesController {

    public orderLinesController: Router = Router();

    private appOrderLinesService: OrderLinesService = new OrderLinesService();
    private authMiddleware: AuthMiddleware = new AuthMiddleware();

    constructor() {
        this.orderLinesController.get('/order-lines/published', this.authMiddleware.isHavePermissions([Role.USER, Role.MANAGER]), this.getPublished.bind(this));

        this.orderLinesController.get('/order-lines', this.authMiddleware.isHavePermissions([Role.MANAGER, Role.MANAGER]), this.getOrderLines.bind(this));
        this.orderLinesController.post('/order-lines', this.authMiddleware.isHavePermissions([Role.MANAGER]), this.createOrderLine.bind(this));
        this.orderLinesController.put('/order-lines/:id', this.authMiddleware.isHavePermissions([Role.MANAGER]), this.updateOrderLine.bind(this));
        this.orderLinesController.get('/order-lines/:id', this.authMiddleware.isHavePermissions([Role.MANAGER]), this.getOne.bind(this));
        this.orderLinesController.delete('/order-lines/:id', this.authMiddleware.isHavePermissions([Role.MANAGER]), this.delete.bind(this));
    }

    private async getOrderLines(req: Request, res: Response, next: NextFunction) {
        const { limit, offset } = req.query;

        try {
            const orderLines = await this.appOrderLinesService.getOrderLines(parseInt(limit) || 1, parseInt(offset) || 0);
            return res.status(200).send(orderLines);
        } catch (err) {
            return next(err);
        }
    }

    private async createOrderLine(req: Request, res: Response, next: NextFunction) {
        const orderLine = req.body;

        try {
            const createdOrderLine = await this.appOrderLinesService.create(orderLine);
            return res.status(201).send(createdOrderLine);
        } catch (err) {
            return next(err);
        }
    }

    private async updateOrderLine(req: Request, res: Response, next: NextFunction) {
        const orderLine = req.body;
        const { id } = req.params;

        try {
            const updatedOrderLine = await this.appOrderLinesService.update(id, orderLine);
            return res.status(200).send(updatedOrderLine);
        } catch (err) {
            return next(err);
        }
    }

    private async getPublished(req: Request, res: Response, next: NextFunction){
        try {
            const orderLine = await this.appOrderLinesService.getPublished();
            return res.status(200).send(orderLine);
        } catch (err) {
            return next(err);
        }
    }

    private async getOne(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;

        try {
            const orderLine = await this.appOrderLinesService.getByUuid(id);
            return res.status(200).send(orderLine);
        } catch (err) {
            return next(err);
        }
    }

    private async delete(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;

        try {
            await this.appOrderLinesService.delete(id);
            return res.status(200).send();
        } catch (err) {
            return next(err);
        }
    }
}