import { BadRequestException } from "@nestjs/common";
import { UserAbstractReposiotory } from "../../../domain/repositories/user-repository/user-repository.abstract";
import { BooksAbstractRepository } from "src/domain/repositories/books-repository/books-repository.abstract";
import { BookDto, BookUpdateDto } from "src/infrastructure/controllers/books/dto/book.dto";
import { BookEntity } from "@prisma/client";

export class BooksUsecase {
  constructor(
    private readonly BookRepository: BooksAbstractRepository,
  ) { };

  public async create(data: BookDto): Promise<BookEntity> {
    const isExistBook = await this.BookRepository.getByName(data.name);
    if (isExistBook) throw new BadRequestException("This book already exist");
    return await this.BookRepository.create({ name: data.name, authorId: data._id });
  };


  public async delete(data: BookDto): Promise<string> {
    const isExistBook = await this.BookRepository.getByName(data.name);
    if (!isExistBook || isExistBook.authorId !== data._id) {
      throw new BadRequestException("You don't have this book");
    };
    await this.BookRepository.delete(isExistBook.name);
    return "Book was success delete";
  };

  public async findMyBook(userId: number): Promise<BookEntity[]> {
    return await this.BookRepository.findAll(userId);
  };

  public async update(data: BookUpdateDto): Promise<BookEntity> {
    const isExistBook = await this.BookRepository.getByName(data.name);
    if (!isExistBook || isExistBook.authorId !== data._id) {
      throw new BadRequestException("You don't have this book");
    };
    return await this.BookRepository.update(data.updateName, data._id);
  };
}
