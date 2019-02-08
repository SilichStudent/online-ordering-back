import {BaseModel} from '../../models/base/BaseModel'
import { Repository, getRepository, ObjectType } from 'typeorm'

export class BaseRepository<T>{

    protected repository: Repository<T>;

    constructor(model: ObjectType<T>){
        this.repository = getRepository(model);
    }
}