export abstract class JwtAbstractAdapter<T>{
    abstract create(data: T, expiresIn: string): string;
    abstract validateToken(token: string): T | null;
};
