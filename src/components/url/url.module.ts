import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { DatabaseModule } from '@database/database.module';
import { UrlSchema } from './entities/url.entity';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: 'Url',
        schema: UrlSchema
      }
    ])
  ],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule { }
