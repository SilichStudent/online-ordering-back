import * as passwordGenerator from 'generate-password'
import * as bcrypt from 'bcrypt'

import { ManagerRepository } from '../../repositories/ManagerRepository'
import { Manager } from '../../models/Manager';
import { AlreadyExists } from '../../errors/AlreadyExists';
import { DefaultManagerDelete } from '../../errors/DefaultManagerDelete';

export class ManagerService {

    managerRepository: ManagerRepository = new ManagerRepository();

    private salt: number = parseInt(process.env.BCRYPT_SALT);

    async create(body): Promise<Manager> {
        const manager: Manager = new Manager();

        const pass = passwordGenerator.generate({
            length: 10,
            numbers: true
        });

        const isManagerExists = await this.managerRepository.findByEmail(body.email);

        if (isManagerExists) {
            throw new AlreadyExists();
        }

        manager.email = body.email;
        console.log(pass);

        manager.password = bcrypt.hashSync(pass, this.salt);

        const createdProduct = await this.managerRepository.create(manager);
        return createdProduct;
    }

    async getCurrentManager(uuid: string) {
        const manager = await this.managerRepository.findByUuid(uuid);
        manager.password = undefined;
        return manager;
    }

    async getManagers(limit, offset) {
        const managers = await this.managerRepository.find(limit, offset);
        const count = await this.managerRepository.count();
        return {
            list: managers,
            offset: offset,
            limit: limit,
            count
        }
    }

    async delete(id) {
        const manager = await this.managerRepository.findByUuid(id);

        if (manager.email === "manager@softarex.com") {
            throw new DefaultManagerDelete();
        }

        await this.managerRepository.delete(id);
        return { uuid: id }
    }
}