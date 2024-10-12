import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagsService {
  constructor(
    private readonly tagRepository: TagRepository
  ) { }
  create(createTagDto: CreateTagDto) {
    return this.tagRepository.create(createTagDto);
  }

  findAll(user_id: string) {
    return this.tagRepository.find({ user_id });
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  async remove(id: string, user_id: string) {
    return await this.tagRepository.findOneAndDelete({ id, user_id });
  }
}
