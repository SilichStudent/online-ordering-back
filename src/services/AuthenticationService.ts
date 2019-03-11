import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

import { UserRepository } from '../repositories/UserRepository';
import { Role } from '../enums/Role'
import { ManagerRepository } from '../repositories/ManagerRepository';
import { NotFound } from '../errors/NotFound';

export class AuthenticationService{
    
    userRepository: UserRepository = new UserRepository();
    managersRepository: ManagerRepository = new ManagerRepository();

    // private salt: number = parseInt(process.env.BCRYPT_SALT);
    private jwtSalt: string = process.env.JWT_SALT;

    public async authUser(email, password){
        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new NotFound();
        }

        if(!bcrypt.compareSync(password, user.password)){
            throw new NotFound();
        }

        const token = jwt.sign({ uuid: user.uuid, role: Role.USER }, this.jwtSalt, { expiresIn : '2h'});

        user.password = undefined;

        return {
            token,
            user
        }
    }

    public async authManager(email, password){
        const manager = await this.managersRepository.findByEmail(email);

        if(!manager){
            throw new NotFound();
        }

        if(!bcrypt.compareSync(password, manager.password)){
            throw new NotFound();
        }

        const token = jwt.sign({ uuid: manager.uuid, role: Role.MANAGER }, this.jwtSalt, { expiresIn : '2h'});

        manager.password = undefined;

        return {
            token,
            user: manager
        }
    }
}