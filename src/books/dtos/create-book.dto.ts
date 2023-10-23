import {
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  IsUUID,
  Min,
  Max,
  IsDate,
} from 'class-validator';

export class CreateBookDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  title: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(1000)
  price: number;

  @IsNotEmpty()
  @IsUUID()
  authorId: string;

}
