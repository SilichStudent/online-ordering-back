import { BaseRepository } from './base/BaseRepository'
import { Manager } from '../models/Manager'

export class ManagerRepository extends BaseRepository<Manager> {

    constructor() {
        super(Manager)
    }

    async findByEmail(email): Promise<Manager> {
        const manager = await this.getRepository().findOne({ email });
        return manager;
    }

    async find(limit: number, offset: number): Promise<Array<Manager>> {
        const managers = await this.getRepository().find({ skip: offset, take: limit });
        return managers;
    }

    async delete(id: string){
        await this.getRepository().delete(id);
    }
}