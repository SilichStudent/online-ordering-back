import { Entity, Column, ObjectID, ManyToMany } from 'typeorm'
import { BaseModel } from './base/BaseModel';
import { Category } from './Category';

@Entity({ name: 'products' })
export class Product extends BaseModel{

    @Column({ nullable: false })
    name: string;

    @ManyToMany( type => Category, category => category.products)
    category: Category;

    @Column({ nullable : false})
    description: string;

    @Column({ nullable: false })
    image: string;
}