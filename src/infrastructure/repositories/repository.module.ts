import { UserRepository } from "./users-repository/users.reposiory";
import { TokensRepository } from "./tokens-repository/tokens.repository";
import { Module } from "@nestjs/common"
import { PrismaService } from "../config/prisma.config";
import { BooksRepository } from "./books-repository/books.repository";

@Module({
  providers: [
    UserRepository,
    TokensRepository,
    PrismaService,
    BooksRepository
  ],
  exports: [
    UserRepository,
    TokensRepository,
    BooksRepository
  ]
})
export class RepositoryModule { };
