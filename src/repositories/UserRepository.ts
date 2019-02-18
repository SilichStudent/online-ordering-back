import { BaseRepository } from './base/BaseRepository'
import { User } from '../models/User'
import { ObjectID } from 'typeorm';

export class UserRepository extends BaseRepository<User> {
    constructor() {
        super(User)
    }

    async findById(id: string): Promise<User> {
        const user = await this.getRepository().findOne(id);
        return user;
    }

    async create(user: User): Promise<User> {
        const createdUser = await this.getRepository().save(user);
        return createdUser;
    }

    async find(limit: number, offset: number): Promise<Array<User>> {
        const users = await this.getRepository().find({ skip: offset, take: limit });
        return users;
    }

    async update(user: User): Promise<any> {
        const updatedUser = await this.getRepository().update(user.id, { name: user.name, email: user.email, password: user.password });
        return updatedUser;
    }

    async delete(id: ObjectID): Promise<boolean> {
        await this.getRepository().delete(id);
        return true;
    }

    async count(): Promise<number> {
        const count = await this.getRepository().count();
        return count;
    }
}