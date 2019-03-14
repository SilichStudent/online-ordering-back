import { Entity, JoinColumn, OneToMany, ManyToOne, Column } from 'typeorm'
import { BaseModel } from './base/BaseModel';
import { User } from './User'
import { OrderProduct } from './OrderProduct';

@Entity({ name: 'orders' })
export class Order extends BaseModel {

    @ManyToOne(type => User, user => user.orders)
    @JoinColumn({ name: "user_uuid"})
    user: User;
    
    @Column({ name: "user_uuid", type: "uuid", nullable: true })
    userUuid: string;

    @OneToMany(type => OrderProduct, orderProduct => orderProduct.order)
    orderProducts: OrderProduct[];

}