import { Router, Request, Response, NextFunction } from 'express'
import { UserRepository } from '../repositories/UserRepository'
import { User } from '../models/User';

export class UserController {

    public userController: Router = Router();

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.userController.get('/users/:id', this.getUser.bind(this));
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

    private async createUser(req: Request, res: Response, next: NextFunction) {
        const { email, password, name } = req.body;
        const user : User = new User();

        user.name = name;
        user.password = password;
        user.email = email;

        try{
            const createdUser = await this.userRepository.create(user);
            return res.status(201).send(createdUser);
        } catch (err){
           return next(err); 
        }
    }
}