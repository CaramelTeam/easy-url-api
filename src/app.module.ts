import { Module } from '@nestjs/common';
import { UrlModule } from './components/url/url.module';
import { TagsModule } from './components/tags/tags.module';
import { UserModule } from './components/user/user.module';
import { AuthModule } from './components/auth/auth.module';

@Module({
  imports: [UrlModule, TagsModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
