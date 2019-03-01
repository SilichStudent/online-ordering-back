import { Entity, Column, OneToMany, ManyToOne } from 'typeorm'
import { BaseModel } from './base/BaseModel';
import { Product } from './Product'
import { Order } from './Order';

@Entity({ name: 'order_products' })
export class OrderProduct extends BaseModel {

    @ManyToOne(type => Order, order => order.orderProducts)
    order: Order;

    @ManyToOne(type => Product)
    product: Product;

    @Column({ nullable: false })
    quantity: number;

}