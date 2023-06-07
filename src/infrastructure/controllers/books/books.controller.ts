import { Body, Controller, HttpCode, Inject, Post, Delete, UseGuards, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../../common/guards/auth.guard";
import { BooksUseCaseModule } from "src/use-cases/books-usecases/books.usecases-proxy";
import { BooksUsecase } from "src/use-cases/books-usecases/usecase-blocks/books.usecase";
import { BookDto, BookUpdateDto } from "./dto/book.dto";
import { BodyCanActivate } from "../auth/dto/user.register.dto";

@Controller("/books")
@ApiTags("Books")
export class BooksController {
  constructor(
    @Inject(BooksUseCaseModule.BOOK_USECASE)
    private readonly BookUseCaseInstanse: BooksUsecase
  ) { };

  @Post("/create")
  @HttpCode(200)
  @ApiBody({ type: BookDto })
  @ApiBearerAuth("access-token")
  @ApiOperation({
    description: "Create Book"
  })
  @UseGuards(AuthGuard)
  public async create(@Body() bookDto: BookDto) {
    return this.BookUseCaseInstanse.create(bookDto);
  };


  @Delete("/delete")
  @HttpCode(200)
  @ApiBody({ type: BookDto })
  @ApiBearerAuth("access-token")
  @ApiOperation({
    description: "Delete Book"
  })
  @UseGuards(AuthGuard)
  public async delete(@Body() bookDto: BookDto) {
    return this.BookUseCaseInstanse.delete(bookDto);
  };

  @Post("/update")
  @HttpCode(200)
  @ApiBody({ type: BookUpdateDto })
  @ApiBearerAuth("access-token")
  @ApiOperation({
    description: "Update Book"
  })
  @UseGuards(AuthGuard)
  public async update(@Body() bookDto: BookUpdateDto) {
    return this.BookUseCaseInstanse.update(bookDto);
  };


  @Get("/all")
  @HttpCode(200)
  @ApiBody({ type: BookDto })
  @ApiBearerAuth("access-token")
  @ApiOperation({
    description: "Get Book"
  })
  @UseGuards(AuthGuard)
  public async getAll(@Body() bookDto: BodyCanActivate) {
    return this.BookUseCaseInstanse.findMyBook(bookDto._id);
  };

}
