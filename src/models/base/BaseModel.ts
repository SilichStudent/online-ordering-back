import { ObjectIdColumn, CreateDateColumn, ObjectID } from 'typeorm'

export abstract class BaseModel{

    @ObjectIdColumn()
    id: ObjectID;

    @CreateDateColumn()
    createdDate: string;
}