import { Entity, Column } from 'typeorm'
import { BaseModel } from './base/BaseModel';

@Entity({ name: 'users' })
export class User extends BaseModel{

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    balance: number;
}