import { IsNotEmpty, Length } from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsNotEmpty()
  @Length(10, 10000, {
    message: 'content should be between 10 and 10000 characters long',
  })
  content: string;
}
