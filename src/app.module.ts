import { Module } from '@nestjs/common';
import { UrlModule } from './components/url/url.module';
import { TagsModule } from './components/tags/tags.module';

@Module({
  imports: [UrlModule, TagsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
