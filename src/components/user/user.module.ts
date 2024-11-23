import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '@database/database.module';
import { UserDocument, UserSchema } from './entities/user.entity';
import { AdapterModule } from 'libs/adapters/adapter.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: UserDocument.name,
        schema: UserSchema
      }
    ]),
    AdapterModule
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule { }
