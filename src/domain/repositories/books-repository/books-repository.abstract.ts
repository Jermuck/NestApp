import { BookEntity, Prisma } from "@prisma/client";

export abstract class BooksAbstractRepository {
  abstract create(data: Prisma.BookEntityCreateManyInput): Promise<BookEntity>;
  abstract update(nameUpdate: string, id: number): Promise<BookEntity>;
  abstract delete(name: string): Promise<void>;
  abstract getByName(name: string): Promise<BookEntity>;
  abstract findAll(userId: number): Promise<BookEntity[]>;
}
