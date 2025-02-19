import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { DatabaseModule } from '@database/database.module';
import { UrlDocument, UrlSchema } from './entities/url.entity';
import { UrlRepository } from './url.repository';
import { FirebaseModule } from '@config/firebase/firebase.module';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: UrlDocument.name,
        schema: UrlSchema
      }
    ]),
    FirebaseModule
  ],
  controllers: [UrlController],
  providers: [UrlService, UrlRepository],
})
export class UrlModule { }
