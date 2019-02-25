import { Router, Request, Response, NextFunction } from 'express'
import { OrderLinesService } from '../services/app/OrderLinesService'
import { OrderLineRepository } from '../repositories/OrderLineRepository';

export class OrderLinesController {

    public orderLinesController: Router = Router();

    private orderLinesRepository: OrderLineRepository = new OrderLineRepository();

    private appOrderLinesService: OrderLinesService = new OrderLinesService();

    constructor() {
        this.orderLinesController.get('/order-lines', this.getOrderLines.bind(this));
        this.orderLinesController.post('/order-lines', this.createOrderLine.bind(this));

        // this.orderLinesController.get('/order-lines/:id', this.getCategory.bind(this));
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
        const product = req.body;

        try {
            const createdOrderLine = await this.appOrderLinesService.create(product);
            return res.status(200).send(createdOrderLine);
        } catch (err) {
            return next(err);
        }
    }
}