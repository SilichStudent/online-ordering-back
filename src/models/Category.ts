import { Entity, Column, OneToMany } from 'typeorm'
import { BaseModel } from './base/BaseModel';
import { Product } from './Product';

@Entity({ name: 'categories' })
export class Category extends BaseModel {

    @Column({ nullable: false, unique: true })
    name: string;

    @OneToMany(type => Product, product => product.category)
    products: Product[];
}