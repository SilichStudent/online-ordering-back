import { Entity, Column } from 'typeorm'
import { BaseModel } from './base/BaseModel';

@Entity({ name: 'managers' })
export class Manager extends BaseModel {

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false, unique: true })
    email: string;
}