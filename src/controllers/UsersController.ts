import { Router, Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/UserRepository";
import { UsersService } from "../services/app/UsersService";
import { AuthenticationService } from "../services/AuthenticationService";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { Role } from "../enums/Role";

export class UserController {
  public userController: Router = Router();

  private userRepository: UserRepository = new UserRepository();
  private appUsersService: UsersService = new UsersService();
  private authService: AuthenticationService = new AuthenticationService();
  private authMiddleware: AuthMiddleware = new AuthMiddleware();

  constructor() {
    this.userController.get("/users/current", this.authMiddleware.isHavePermissions([Role.USER]), this.getCurrentUser.bind(this));
    this.userController.post("/users/signIn", this.signIn.bind(this));

    this.userController.get("/users/:id", this.authMiddleware.isHavePermissions([Role.MANAGER]), this.getUser.bind(this));
    this.userController.delete("/users/:id", this.authMiddleware.isHavePermissions([Role.MANAGER]), this.deleteUser.bind(this));
    this.userController.put("/users/:id", this.authMiddleware.isHavePermissions([Role.MANAGER]), this.updateUser.bind(this));

    this.userController.get("/users", this.authMiddleware.isHavePermissions([Role.MANAGER]), this.getUsers.bind(this));
    this.userController.post("/users", this.authMiddleware.isHavePermissions([Role.MANAGER]), this.createUser.bind(this));
  }

  private async getUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const user = await this.userRepository.findById(id);
      return res.status(200).send(user);
    } catch (err) {
      return next(err);
    }
  }

  private async getUsers(req: Request, res: Response, next: NextFunction) {
    const { limit, offset } = req.query;

    try {
      const users = await this.appUsersService.getUsers(
        parseInt(limit),
        parseInt(offset)
      );
      return res.status(200).send(users);
    } catch (err) {
      return next(err);
    }
  }

  private async createUser(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    try {
      const createdUser = await this.appUsersService.create(body);
      return res.status(201).send(createdUser);
    } catch (err) {
      return next(err);
    }
  }

  private async updateUser(req: Request, res: Response, next: NextFunction) {
    const user = req.body;
    const { id } = req.params;

    try {
      const updatedUser = await this.userRepository.update(id, user);
      return res.status(200).send(updatedUser);
    } catch (err) {
      return next(err);
    }
  }

  private async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      await this.userRepository.delete(id);
      return res.status(200).send({ id });
    } catch (err) {
      return next(err);
    }
  }

  private async signIn(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const result = await this.authService.authUser(email, password);
      return res.status(200).send(result);
    } catch (err) {
      return next(err);
    }
  }

  private async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    const { currentUser } = req.body;

    try {
      const result = await this.appUsersService.getCurrentUser(currentUser.id);
      return res.status(200).send(result);
    } catch (err) {
      return next(err);
    }
  }
}
