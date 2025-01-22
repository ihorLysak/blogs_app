import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto, userId: string) {
    const author = await this.userRepository.findOneBy({ id: userId });

    if (!author) {
      throw new NotFoundException('user not found');
    }

    const post = await this.postRepository.findOneBy({
      id: createCommentDto.postId,
    });

    if (!post) {
      throw new NotFoundException('post not found');
    }

    return this.commentRepository.save({
      content: createCommentDto.content,
      author,
      post,
    });
  }

  async findAll() {
    return await this.commentRepository.find();
  }

  async findOne(id: string) {
    const comment = await this.commentRepository.findOneBy({ id });

    if (!comment) {
      throw new NotFoundException('comment not found');
    }
    return comment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOneBy({ id });

    if (!comment) {
      throw new NotFoundException('Comment to update not found');
    }
    return await this.commentRepository.update(
      { id },
      { content: updateCommentDto.content },
    );
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
