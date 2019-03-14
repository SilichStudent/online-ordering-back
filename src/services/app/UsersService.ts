import * as passwordGenerator from 'generate-password'
import * as bcrypt from 'bcrypt'

import { UserRepository } from '../../repositories/UserRepository'
import { User } from '../../models/User';
import { EmailService } from '../EmailService';
import { CustomError } from '../../errors/CustomError';

export class UsersService {

    usersRepository: UserRepository = new UserRepository();
    emailService: EmailService = new EmailService();

    private salt: number = parseInt(process.env.BCRYPT_SALT);

    async create(body): Promise<User> {
        const user: User = new User();

        const pass = passwordGenerator.generate({
            length: 10,
            numbers: true
        });

        user.name = body.name;
        user.email = body.email;
        console.log(pass);

        user.password = bcrypt.hashSync(pass, this.salt);
        user.balance = body.balance || 0;
        user.isBlocked = body.isBlocked || false;

        const createdUser = await this.usersRepository.create(user);
        await this.emailService.sendEmailToUser(createdUser.email, pass);
        return createdUser;
    }

    async getUsers(limit: number, offset: number): Promise<any> {
        const users = await this.usersRepository.find(limit, offset);
        const count = await this.usersRepository.count();
        return {
            list: users,
            offset: offset,
            limit,
            count
        }
    }

    async getCurrentUser(uuid: string) {
        const user = await this.usersRepository.findByUuid(uuid);
        user.password = undefined;
        return user;
    }

    public async changePassword(body, userUuid) {
        const { oldPassword, newPassword } = body;

        const user = await this.usersRepository.findByUuid(userUuid);

        if (bcrypt.compareSync(oldPassword, user.password)) {
            await this.usersRepository.changePassword(userUuid, newPassword);
        } else {
            throw new CustomError(400, "old password don't match");
        }
    }

    public async changeName(name, userUuid) {
        await this.usersRepository.changeName(userUuid, name);
    }
}