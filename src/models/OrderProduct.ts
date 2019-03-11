import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm'
import { BaseModel } from './base/BaseModel';
import { Product } from './Product'
import { Order } from './Order';

@Entity({ name: 'order_products' })
export class OrderProduct extends BaseModel {

    @ManyToOne(type => Order, order => order.orderProducts)
    @JoinColumn({ name: "order_uuid"})
    order: Order;

    @ManyToOne(type => Product)
    @JoinColumn({ name: "product_uuid"})
    product: Product;

    @Column({ nullable: false })
    quantity: number;

}