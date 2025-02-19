import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { DatabaseModule } from '@database/database.module';
import { TagDocument, TagSchema } from './entities/tag.entity';
import { TagRepository } from './tag.repository';
import { FirebaseModule } from '@config/firebase/firebase.module';

@Module({
  controllers: [TagsController],
  providers: [TagsService, TagRepository],
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: TagDocument.name,
        schema: TagSchema
      }
    ]),
    FirebaseModule
  ]
})
export class TagsModule { }
