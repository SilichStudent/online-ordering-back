import { UserRepository } from '../../repositories/UserRepository'
import { User } from '../../models/User';

export class UsersService{

    usersRepository: UserRepository = new UserRepository();

    async create(body): Promise<User>{
        const user: User = new User();

        user.name = body.name;
        user.email = body.email;
        user.password = body.password;
        user.balance = body.balance || 0;
        user.isBlocked = body.isBlocked || false;

        const createdProduct = await this.usersRepository.create(user);
        return createdProduct;
    }

    async getUsers(limit: number, offset: number): Promise<any>{
        const users = await this.usersRepository.find(limit, offset);
        const count = await this.usersRepository.count();
        return{
            list: users,
            offset: offset,
            limit: users.length,
            count
        }
    }
}