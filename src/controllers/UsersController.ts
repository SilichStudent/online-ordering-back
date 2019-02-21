import { Router, Request, Response, NextFunction } from 'express'
import { UserRepository } from '../repositories/UserRepository'
import { User } from '../models/User';
import { UsersService } from '../services/app/UsersService'
import { ObjectID } from 'typeorm';

export class UserController {

    public userController: Router = Router();

    private userRepository: UserRepository = new UserRepository();

    private appUsersService: UsersService = new UsersService();

    constructor() {
        this.userController.get('/users/:id', this.getUser.bind(this));
        this.userController.delete('/users/:id', this.deleteUser.bind(this));
        this.userController.get('/users', this.getUsers.bind(this));
        this.userController.put('./users', this.updateUser.bind(this))
        this.userController.post('/users', this.createUser.bind(this));
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
            const users = await this.appUsersService.getUsers(parseInt(limit), parseInt(offset));
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

        try {
            const updatedUser = await this.userRepository.update(user);
            return res.status(200).send(updatedUser);
        } catch (err) {
            return next(err);
        }
    }

    private async deleteUser(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        try {
            await this.userRepository.delete(new ObjectID(id));
            return res.status(200).send();
        } catch (err) {

        }
    }
}