import { Module } from '@nestjs/common';
import { UrlModule } from './components/url/url.module';
import { TagsModule } from './components/tags/tags.module';
import { UserModule } from './components/user/user.module';

@Module({
  imports: [UrlModule, TagsModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
