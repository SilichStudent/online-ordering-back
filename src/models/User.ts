import { Entity, Column, OneToMany } from 'typeorm'
import { BaseModel } from './base/BaseModel';
import { Order } from './Order'

@Entity({ name: 'users' })
export class User extends BaseModel {

    @Column({ nullable: false, unique: true })
    name: string;

    @Column({ nullable: false})
    password: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ type: "float", default: 0, nullable: false })
    balance: number;

    @Column({ default: false, nullable: false, name: "is_blocked" })
    isBlocked: boolean;

    @OneToMany(type => Order, order => order.user)
    orders: Order[];
}