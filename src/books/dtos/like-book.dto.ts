import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class LikeBookDTO {
  @IsNotEmpty()
  @IsUUID()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  bookId: string;
}
