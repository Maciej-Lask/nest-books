// import {
//     Controller,
//     Get,
//     Post,
//     Put,
//     Delete,
//     Body,
//     NotFoundException,
//     Param,
//     ParseUUIDPipe,
// } from '@nestjs/common';
// import { Book } from '@prisma/client';
// import { BooksService } from './books.service';
// import { CreateBookDTO } from './dtos/create-book.dto';
// import { UpdateBookDTO } from './dtos/update-book.dto';

// @Controller('books')
// export class BooksController {
//     constructor(private booksService: BooksService) {

//     }
// }
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { Book } from '@prisma/client';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dtos/create-book.dto';
import { UpdateBookDTO } from './dtos/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get('/')
  public getAll(): Promise<Book[]> {
    return this.booksService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const book = await this.booksService.getById(id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  @Post('/')
  async create(@Body() bookData: CreateBookDTO) {
    return this.booksService.create(bookData);
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() bookData: UpdateBookDTO,
  ) {
    if (!(await this.booksService.getById(id)))
      throw new NotFoundException('Book not found');
    return this.booksService.updateById(id, bookData);
  }

  @Delete('/:id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.booksService.getById(id)))
      throw new NotFoundException('Book not found');
    await this.booksService.deleteById(id);
    return { success: true };
  }
}