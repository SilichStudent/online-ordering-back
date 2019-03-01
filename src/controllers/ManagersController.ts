import { Router, Request, Response, NextFunction } from 'express';
import { ManagerService } from '../services/app/ManagerService';
import { AuthenticationService } from '../services/AuthenticationService';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { Role } from '../enums/Role';

export class ManagersController {

    public managersController: Router = Router();

    private managersService: ManagerService = new ManagerService();
    private authService: AuthenticationService = new AuthenticationService();
    private authMiddleware: AuthMiddleware = new AuthMiddleware();

    constructor() {
        this.managersController.get("/managers/current", this.authMiddleware.isHavePermissions([Role.MANAGER]), this.getCurrentUser.bind(this));
        this.managersController.post("/managers/signIn", this.signIn.bind(this));

        this.managersController.delete("/managers/:id", this.authMiddleware.isHavePermissions([Role.MANAGER]), this.deleteManager.bind(this));

        this.managersController.get("/managers", this.authMiddleware.isHavePermissions([Role.MANAGER]), this.getManagers.bind(this));
        this.managersController.post("/managers", this.authMiddleware.isHavePermissions([Role.MANAGER]), this.createManager.bind(this));
    }

    private async signIn(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        try {
            const result = await this.authService.authManager(email, password);
            return res.status(200).send(result);
        } catch (err) {
            return next(err);
        }
    }

    private async getCurrentUser(req: Request, res: Response, next: NextFunction) {
        const { currentUser } = req.body;

        try {
            const result = await this.managersService.getCurrentManager(currentUser.id);
            return res.status(200).send(result);
        } catch (err) {
            return next(err);
        }
    }

    private async createManager(req: Request, res: Response, next: NextFunction) {
        const body = req.body;

        try {
            const createdUser = await this.managersService.create(body);
            return res.status(201).send(createdUser);
        } catch (err) {
            return next(err);
        }
    }

    private async getManagers(req: Request, res: Response, next: NextFunction) {
        const { limit, offset } = req.query;

        try {
            const managers = await this.managersService.getManagers(
                parseInt(limit),
                parseInt(offset)
            );
            return res.status(200).send(managers);
        } catch (err) {
            return next(err);
        }
    }

    private async deleteManager(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
    
        try {
          await this.managersService.delete(id);
          return res.status(200).send({ id });
        } catch (err) {
          return next(err);
        }
      }
}