import { ObjectIdColumn, CreateDateColumn } from 'typeorm'

export abstract class BaseModel{

    @ObjectIdColumn()
    uuid: string;

    @CreateDateColumn()
    createdDate: string;
}