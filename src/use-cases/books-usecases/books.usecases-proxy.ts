import { DynamicModule } from "@nestjs/common";
import { UserRepository } from "../../infrastructure/repositories/users-repository/users.reposiory";
import { BooksUsecase } from "./usecase-blocks/books.usecase";
import { RepositoryModule } from "../../infrastructure/repositories/repository.module";
import { BooksRepository } from "src/infrastructure/repositories/books-repository/books.repository";

export class BooksUseCaseModule {
  static BOOK_USECASE = "BOOK_USECASE";

  static register(): DynamicModule {
    return {
      module: BooksUsecase,
      providers: [
        {
          inject: [BooksRepository],
          useFactory: (
            booksRepo: BooksRepository
          ) => new BooksUsecase(booksRepo),
          provide: this.BOOK_USECASE
        }
      ],
      exports: [
        this.BOOK_USECASE
      ],
      imports: [
        RepositoryModule
      ]
    }
  }
}
