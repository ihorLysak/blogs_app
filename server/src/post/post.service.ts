import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/user/entities/user.entity';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}
  async create(createPostDto: CreatePostDto, id: string) {
    const author = await this.userRepository.findOneBy({ id });

    if (!author) {
      throw new NotFoundException('User not found');
    }

    return await this.postRepository.save({ ...createPostDto, author });
  }

  async findAll() {
    const posts = await this.postRepository.find({
      relations: ['author', 'comments'],
    });
    return posts;
  }

  async findOne(id: string) {
    return await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'comments'],
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOneBy({ id });

    if (!post) {
      throw new NotFoundException('Post to update was not found');
    }

    await this.postRepository.update({ id }, { ...updatePostDto });
  }

  async remove(id: string): Promise<void> {
    await this.postRepository.delete({ id });
  }
}
