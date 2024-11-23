import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { envs } from '@config/envs';
import { JwtStrategy } from './strategies/jwt.strategies';
import { AdapterModule } from '@libs/adapters/adapter.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: envs.jwt.secret,
      signOptions: {
        expiresIn: envs.jwt.expiration
      }
    }),
    AdapterModule
  ],
  exports: [JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule { }
