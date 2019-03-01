import { PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

export abstract class BaseModel{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    createdDate: string;
}