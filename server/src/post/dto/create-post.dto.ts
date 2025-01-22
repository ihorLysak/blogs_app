import { IsNotEmpty, Length } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @Length(3, 100, {
    message: 'title should be between 3 and 100 characters long',
  })
  title: string;

  @IsNotEmpty()
  @Length(10, 10000, {
    message: 'content should be between 10 and 10000 characters long',
  })
  content: string;
}
