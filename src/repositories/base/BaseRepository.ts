import { Repository, getRepository, ObjectType } from 'typeorm'

export class BaseRepository<T>{

    protected getRepository(entity : ObjectType<T>) : Repository<T>{
        return getRepository(entity);
    }
}