import * as redis from 'redis';
import { env } from 'process'

class RedisService{

    private client : redis.RedisClient;

    constructor(){
        this.client = redis.createClient({
            port: process.env.REDIS_PORT,
            host: process.env.REDIS_HOST,
            db: process.env.REDIS_DATABASE
        });
    }

    public set(key: string, value: string){
        this.client.set(key, value);
    }

    public async get(key : string) : Promise<string> {
        const promise = new Promise<string>((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if(err){
                    return reject(err);
                }
                return resolve(value);
            })
        });

        
        
        const value = await promise;

        return value;
    }
}

module.exports = {
    redisService : new RedisService()
}