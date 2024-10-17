import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UrlRepository } from './url.repository';

@Injectable()
export class UrlService {

  constructor(
    private readonly urlRepository: UrlRepository
  ) { }


  create(createUrlDto: CreateUrlDto) {
    return this.urlRepository.create(createUrlDto);
  }

  findAll(user_id: string) {
    return this.urlRepository.find({ user_id });
  }

  findByTag(tag: string) {
    return this.urlRepository.findByTag(tag);
  }

  findOne(id: string) {
    return this.urlRepository.findOne({ id });
  }

  update(id: string, updateUrlDto: UpdateUrlDto) {
    return this.urlRepository.findOneAndUpdate({ id }, updateUrlDto);
  }

  remove(id: string) {
    return this.urlRepository.findOneAndDelete({ id });
  }
}
