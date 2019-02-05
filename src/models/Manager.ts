import { Entity, Column } from 'typeorm'
import { BaseModel } from './base/BaseModel';

@Entity({ name: 'users' })
export class Manager extends BaseModel{

    @Column()
    password: string;

    @Column()
    email: string;
}