import { BaseRepository } from './base/BaseRepository'
import { User } from '../models/User'

export class UserRepository extends BaseRepository<User> {
    constructor() {
        super(User)
    }

    async find(limit: number, offset: number): Promise<Array<User>> {
        const users = await this.getRepository().find({ skip: offset, take: limit });
        return users;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.getRepository().findOne({ email });
        return user;
    }

    async update(id: string, user: User): Promise<any> {
        await this.getRepository().update(id, { isBlocked: user.isBlocked, balance: user.balance});
        const updatedUser = this.findById(id);
        return updatedUser;
    }

    async delete(id: string): Promise<boolean> {
        await this.getRepository().delete(id);
        return true;
    }
}