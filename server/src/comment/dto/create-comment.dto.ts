import { IsNotEmpty, Length } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @Length(10, 10000, {
    message: 'content should be between 10 and 10000 characters long',
  })
  content: string;

  @IsNotEmpty()
  postId: string;
}
