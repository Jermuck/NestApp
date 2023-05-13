export abstract class JwtAbstractAdapter<T>{
    abstract create(data: T, expiresIn: string): string;
    abstract validateToken(token: string): Promise<T | null>;
    abstract decode(token:string): void;
};
