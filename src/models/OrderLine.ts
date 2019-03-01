import { Entity, Column, ManyToMany, JoinTable } from 'typeorm'
import { BaseModel } from './base/BaseModel';
import { Product } from './Product';
import { Category } from './Category';

@Entity({ name: 'order_lines' })
export class OrderLine extends BaseModel {

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false, name: "start_time" })
    startTime: Date;

    @Column({ nullable: false, name: "end_time" })
    endTime: Date;

    @Column({ nullable: false, name: "is_active" })
    isActive: boolean;

    @Column({ nullable: false })
    published: boolean;

    @ManyToMany(type => Category, { cascade: true })
    @JoinTable()
    categories: Category[];

    @ManyToMany(type => Product, { cascade: true })
    @JoinTable()
    products: Product[];
}