import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm'
import { BaseModel } from './base/BaseModel';
import { Category } from './Category';
import { OrderProduct } from './OrderProduct';

@Entity({ name: 'products' })
export class Product extends BaseModel {

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    image: string;

    @ManyToOne(type => Category, category => category.products, { onDelete: "CASCADE" })
    @JoinColumn({ name: "category_uuid" })
    category: Category;

    @Column({ name: "category_uuid", type: "uuid", nullable: true })
    categoryUuid: string;

    @OneToMany(type => OrderProduct, orderProduct => orderProduct.product)
    orderProducts: OrderProduct[];
}