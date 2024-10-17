import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetCurrentUser } from '@libs/utils/decorator/get-user.decorator';
import { UserInterfaceJWT } from '@libs/utils/decorator/constants/interface/user.interface';

@UseGuards(JwtAuthGuard)
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) { }

  @Post()
  create(@Body() createUrlDto: CreateUrlDto, @GetCurrentUser() user: UserInterfaceJWT) {
    createUrlDto.user_id = user._id;
    return this.urlService.create(createUrlDto);
  }

  @Get()
  findAll(@GetCurrentUser() user: UserInterfaceJWT) {
    return this.urlService.findAll(user._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urlService.findOne(id);
  }

  @Get('tag/:tag')
  findByTag(@Param('tag') tag: string) {
    return this.urlService.findByTag(tag);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.urlService.update(id, updateUrlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlService.remove(id);
  }
}
