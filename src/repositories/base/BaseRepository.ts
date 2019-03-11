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
    
    public async findByUuid(uuid: string): Promise<T> {
        const entity = await this.getRepository().findOne(uuid);
        return entity;
    }

    public async create(entity: T): Promise<T> {
        const createdEntity = await this.getRepository().save(entity);
        return createdEntity;
    }

    public async findTree(limit: number, offset: number): Promise<Array<T>>{
        const entities = await this.getRepository().find({ skip: offset, take: limit});
        return entities;
    }

    public async delete(uuid: string): Promise<void>{
        await this.getRepository().delete(uuid);
    }
}