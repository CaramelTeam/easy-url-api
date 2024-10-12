import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetCurrentUser } from '@libs/utils/decorator/get-user.decorator';
import { UserInterfaceJWT } from '@libs/utils/decorator/constants/interface/user.interface';

@UseGuards(JwtAuthGuard)
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) { }

  @Post()
  create(@Body() createTagDto: CreateTagDto, @GetCurrentUser() user: UserInterfaceJWT) {
    createTagDto.user_id = user._id;
    return this.tagsService.create(createTagDto);
  }

  @Get()
  findAll(@GetCurrentUser() user: UserInterfaceJWT) {
    return this.tagsService.findAll(user._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto, @GetCurrentUser() user: UserInterfaceJWT) {
    updateTagDto.user_id = user._id;
    return this.tagsService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetCurrentUser() user: UserInterfaceJWT) {
    return this.tagsService.remove(id, user._id);
  }
}
