import { Entity, Column, ManyToOne } from 'typeorm'
import { BaseModel } from './base/BaseModel';
@Entity({ name: 'products' })
export class Product extends BaseModel{

    @Column({ nullable: false })
    name: string;

    
    @Column({ nullable : false})
    description: string;
    
    @Column({ nullable: false })
    image: string;

    @Column()
    categoryId: string;
}