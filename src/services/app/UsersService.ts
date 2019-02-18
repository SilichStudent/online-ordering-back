import { UserRepository } from '../../repositories/UserRepository'

export class UsersService{

    usersRepository: UserRepository = new UserRepository();

    async getUsers(limit: number, offset: number){
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