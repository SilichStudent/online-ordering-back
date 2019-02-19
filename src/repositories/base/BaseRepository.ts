import { Repository, getRepository, ObjectType } from 'typeorm'

export class BaseRepository<T>{

    private entity: ObjectType<T>;

    constructor(entity: ObjectType<T>){
        this.entity = entity;
    }

    protected getRepository(): Repository<T> {
        return getRepository(this.entity);
    }

    public async count(): Promise<number> {
        const count = await this.getRepository().count();
        return count;
    }
}