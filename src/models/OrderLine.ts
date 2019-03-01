import { Entity, Column, ManyToMany, JoinTable } from 'typeorm'
import { BaseModel } from './base/BaseModel';
import { Product } from './Product';
import { type } from 'os';
import { Category } from './Category';

@Entity({ name: 'order_lines' })
export class OrderLine extends BaseModel {

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    startTime: Date;

    @Column({ nullable: false })
    endTime: Date;

    @Column({ nullable: false })
    isActive: boolean;

    @Column({ nullable: false })
    published: boolean;

    @ManyToMany(type => Category)
    @JoinTable()
    categories: Category[];

    @ManyToMany(type => Product)
    @JoinTable()
    products: Product[];
}