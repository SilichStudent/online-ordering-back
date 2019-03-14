import * as redis from 'redis';

export class RedisService {

    private client: redis.RedisClient;

    constructor() {
        this.client = redis.createClient({
            port: process.env.REDIS_PORT,
            host: process.env.REDIS_HOST,
            db: process.env.REDIS_DATABASE
        });
    }

    public set(key: string, value: string) {
        this.client.set(key, value);
    }

    public async get(key: string): Promise<string> {
        const promise = new Promise<string>((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) {
                    return reject(err);
                }
                return resolve(value);
            })
        });

        const value = await promise;

        return value;
    }

    public async lpush(key: string, obj: any): Promise<number> {

        const promise = new Promise<number>((resolve, reject) => {
            this.client.lpush(key, JSON.stringify(obj), (err, value) => {
                if (err) {
                    return reject(err);
                }
                return resolve(value);
            });
        });

        const value = await promise;
        return value;
    }

    public async lrange(key: string, start: number = 0, end: number = -1): Promise<string[]> {
        const promise = new Promise<string[]>((resolve, reject) => {
            this.client.lrange(key, start, end, (err, value) => {
                if (err) {
                    return reject(err);
                }
                return resolve(value);
            })
        });

        const value = await promise;
        return value;
    }

    public async hset(key: string, field: string, value: string): Promise<number> {
        const promise = new Promise<number>((resolve, reject) => {
            this.client.hset(key, field, value, (err, reply) => {
                if (err) {
                    return reject(err);
                }
                return resolve(reply);
            });
        });

        const reply = await promise;
        return reply;
    }

    public async hgetall(key: string): Promise<object> {
        const promise = new Promise<object>((resolve, reject) => {
            this.client.hgetall(key, (err, value) => {
                if (err) {
                    return reject(err);
                }
                return resolve(value);
            })
        });

        const value = await promise;

        return value;
    }

    public del(key: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.client.del(key, (err, value) => {
                if (err) {
                    return reject(err);
                }
                return resolve(value);
            })
        });
    }
}