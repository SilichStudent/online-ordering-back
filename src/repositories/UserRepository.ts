import { BaseRepository } from './base/BaseRepository'
import { User } from '../models/User'

export class UserRepository extends BaseRepository<User> {

    async findById(id: string){
        const user = await this.getRepository(User).findOne(id);
        return user;
    }

    async create(user: User){
        const createdUser = await this.getRepository(User).save(user);
        return createdUser;
    }
}