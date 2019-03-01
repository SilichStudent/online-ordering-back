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
}