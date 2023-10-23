import { User } from '@prisma/client';
import { UsersService } from './users.service';
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

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  public async getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get('/:id')
  public async getById(
    @Param('id', new ParseUUIDPipe()) id: string ){
    const user = await this.usersService.getById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
