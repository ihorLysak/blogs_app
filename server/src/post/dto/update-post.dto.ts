import { IsNotEmpty, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @Length(10, 10000)
  content: string;
}
