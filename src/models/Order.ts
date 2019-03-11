import { Entity, JoinColumn, OneToMany, ManyToOne } from 'typeorm'
import { BaseModel } from './base/BaseModel';
import { User } from './User'
import { OrderProduct } from './OrderProduct';

@Entity({ name: 'orders' })
export class Order extends BaseModel {

    @ManyToOne(type => User, user => user.orders)
    @JoinColumn({ name: "user_uuid"})
    user: User;

    @OneToMany(type => OrderProduct, orderProduct => orderProduct.order)
    orderProducts: OrderProduct[];

}