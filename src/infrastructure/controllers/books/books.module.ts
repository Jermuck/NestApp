import { Module } from "@nestjs/common";
import { BooksUseCaseModule } from "src/use-cases/books-usecases/books.usecases-proxy";
import { JwtAdapterModule } from "../../services/jwt/jwt.module";
import { BooksController } from "./books.controller";

@Module({
  controllers: [
    BooksController
  ],
  imports: [
    BooksUseCaseModule.register(),
    JwtAdapterModule
  ]
})
export class BooksModule { };
