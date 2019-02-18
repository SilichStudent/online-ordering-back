import { Repository, getRepository, ObjectType } from 'typeorm'

export class BaseRepository<T>{

    private entity: ObjectType<T>;

    constructor(entity: ObjectType<T>){
        this.entity = entity;
    }

    protected getRepository(): Repository<T> {
        return getRepository(this.entity);
    }
}