import { Entity, Column } from 'typeorm'
import { BaseModel } from './base/BaseModel';

@Entity({ name: 'users' })
export class User extends BaseModel {

    @Column({ nullable: false, unique: true })
    name: string;

    @Column({ nullable: false, unique: true })
    password: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ type: "float", default: 0, nullable: false })
    balance: number;

    @Column({ default: false, nullable: false })
    isBlocked: boolean;
}