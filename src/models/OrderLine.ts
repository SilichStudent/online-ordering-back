import { Entity, Column } from 'typeorm'
import { BaseModel } from './base/BaseModel';
import { Product } from './Product';

@Entity({ name: 'order_lines' })
export class OrderLine extends BaseModel{

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

    @Column({ nullable: false })
    categories: string[];

    @Column({ nullable: false })
    products: string[];
}