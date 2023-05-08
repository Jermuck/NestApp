export namespace Response{
    export interface Auth<T> {
        access:string;
        header: string;
        data: T;
    };
};