import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  create(@Body() loginDto: LoginDto) {
    return this.authService.validate(loginDto);
  }

  @Post('/validate')
  validateJwt(@Body('token') token: string) {
    return this.authService.validateJwt(token);
  }

}
