import { BaseRepository } from './base/BaseRepository'
import { User } from '../models/User'
import {ObjectID} from 'mongodb'

export class UserRepository extends BaseRepository<User> {

    constructor(){
        super(User);
    }

    async findById(id: string){
        const user = await this.repository.findOne(id);
        return user;
    }

    async create(user: User){
        const createdUser = await this.repository.save(user);
        return createdUser;
    }
}