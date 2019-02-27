import jwt from 'express-jwt'
import bcrypt from 'bcrypt'

import { UserRepository } from '../repositories/UserRepository';

class AuthenticationService{
    
    userRepository: UserRepository = new UserRepository();

    public async authUser(email, password){
        const user = await this.userRepository.findByEmailAndPassword(email, password);
    }
}