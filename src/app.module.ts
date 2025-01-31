import { Module } from '@nestjs/common';
import { UrlModule } from './components/url/url.module';
import { TagsModule } from './components/tags/tags.module';
import { UserModule } from './components/user/user.module';
import { AuthModule } from './components/auth/auth.module';
import { HealthModule } from './components/health/health.module';

@Module({
  imports: [UrlModule, TagsModule, UserModule, AuthModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
