import { Module } from '@nestjs/common';
import { UrlModule } from './components/url/url.module';

@Module({
  imports: [UrlModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
