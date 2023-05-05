export abstract class AbstractRepository<T, U>{
    abstract save(data:T): Promise<U>;
    abstract delete(id:number): Promise<boolean | null>;
    abstract update(id:number): Promise<U | null>;
    abstract getById(id:number): Promise<U | null>;
};