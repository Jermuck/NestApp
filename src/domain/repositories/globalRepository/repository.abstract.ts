export abstract class AbstractRepository<T, U>{
    abstract createAsync(data:T): Promise<U | null>;
    abstract delete(id:number): Promise<boolean | null>;
    abstract update(id:number): Promise<U | null>;
    abstract createSync(data:T): U;
    abstract getById(id:number): Promise<U | null>;
};