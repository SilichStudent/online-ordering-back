import { PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

export abstract class BaseModel{

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn({ name: "created_date"})
    createdDate: string;
}