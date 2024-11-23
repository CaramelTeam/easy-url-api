import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
// import { BcryptAdapterInterface } from '@libs/adapters/bcrypt/bcrypt.interface';
import { JwtService } from '@nestjs/jwt';
import { AdaptersKey } from '@libs/adapters/keys.adapters';
import { BcryptAdapterInterface } from '@libs/adapters/bcrypt/bcrypt.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject(AdaptersKey.BCRYPT_KEY)
    private readonly bcryptAdapter: BcryptAdapterInterface,
    private readonly jwtService: JwtService
  ) { }

  async validate(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    const isValidPass = this.bcryptAdapter.compare(loginDto.password, user.password);
    if (!isValidPass) throw new UnauthorizedException('Unauthorized');
    const token = this.jwtService.sign({ ...user });
    delete user.password;
    return { ...user, token };
  }

  async validateJwt(token: string) {
    try {
      const result = await this.jwtService.verify(token);
      return {
        isValid: true,
        result
      }
    } catch (error) {
      throw new UnauthorizedException({ isValid: false });
    }
  }
}
