import { Injectable } from "@nestjs/common";
import { BookEntity, Prisma } from "@prisma/client";
import { BooksAbstractRepository } from "src/domain/repositories/books-repository/books-repository.abstract";
import { PrismaService } from "src/infrastructure/config/prisma.config";

@Injectable()
export class BooksRepository implements BooksAbstractRepository {
  constructor(
    private readonly prisma: PrismaService
  ) { };


  public async create(data: Prisma.BookEntityCreateManyInput): Promise<BookEntity> {
    return await this.prisma.bookEntity.create({ data });
  };

  public async delete(name: string): Promise<void> {
    await this.prisma.bookEntity.delete({
      where: { name }
    })
  };

  public async update(nameUpdate: string, id: number): Promise<BookEntity> {
    return await this.prisma.bookEntity.update({
      where: { id }, data: { name: nameUpdate }
    })
  };

  public async getByName(name: string): Promise<BookEntity> {
    return await this.prisma.bookEntity.findUnique({
      where: { name }
    })
  };

  public async findAll(userId: number): Promise<BookEntity[]> {
    return await this.prisma.bookEntity.findMany({
      where: { authorId: userId }
    })
  };
}
