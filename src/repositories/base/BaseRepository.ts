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

    
    async findById(id: string): Promise<T> {
        const entity = await this.getRepository().findOne(id);
        return entity;
    }

    async create(entity: T): Promise<T> {
        const createdEntity = await this.getRepository().save(entity);
        return createdEntity;
    }
}