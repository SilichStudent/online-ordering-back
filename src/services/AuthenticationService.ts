import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

import { UserRepository } from '../repositories/UserRepository';

export class AuthenticationService{
    
    userRepository: UserRepository = new UserRepository();

    private salt: number = parseInt(process.env.BCRYPT_SALT);
    private jwtSalt: string = process.env.JWT_SALT;

    public async authUser(email, password){
        // const passwordHash = bcrypt.hashSync(password, this.salt);
        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new Error('User not found');
        }

        if(!bcrypt.compareSync(password, user.password)){
            throw new Error('User not found');
        }

        const token = jwt.sign({ id: user.id }, this.jwtSalt, { expiresIn : '2h'});

        return {
            token,
            user
        }
    }
}