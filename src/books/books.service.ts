import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { Book } from '@prisma/client';
// import { PrismaService } from 'src/shared/services/prisma.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Book[]> {
    return this.prismaService.book.findMany({
      include: {
        author: true,
      },
    });
  }

  public getById(id: Book['id']): Promise<Book | null> {
    return this.prismaService.book.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  public async create(
    bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Book> {

    const authorExists = await this.validateAuthorExists(bookData.authorId);

    if (!authorExists) {
      throw new BadRequestException(
        "Author with the provided authorId doesn't exist",
      );
    }
    try {
      return await this.prismaService.book.create({
        data: bookData,
        include: {
          author: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2002')
        throw new ConflictException('Title is already taken');
      if (error.code === 'P2025')
        throw new BadRequestException("Author doesn't exist");

      throw error;
    }
  }

  public async updateById(
    id: Book['id'],
    bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Book> {
    const authorExists = await this.validateAuthorExists(bookData.authorId);
    if (!authorExists) {
      throw new BadRequestException(
        "Author with the provided authorId doesn't exist",
      );
    }
    try {
      return await this.prismaService.book.update({
        where: { id },
        data: bookData,
        include: {
          author: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2002')
        throw new ConflictException('Title is already taken');
      if (error.code === 'P2025')
        throw new BadRequestException("Author doesn't exist");
      throw error;
    }
  }

  public async deleteById(id: Book['id']): Promise<Book> {
    return await this.prismaService.book.delete({
      where: { id },
    });
  }

  private async validateAuthorExists(authorId: string): Promise<boolean> {
    const existingAuthor = await this.prismaService.author.findUnique({
      where: { id: authorId },
    });

    if (!existingAuthor) {
      return false;
    }else{
      return true;
    }
  }
}
