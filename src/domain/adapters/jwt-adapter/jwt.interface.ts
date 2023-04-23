export interface IJwtService<T>{
    create(data: T, expiresIn: string): string;
    validateToken(token: string): Promise<T>
};