import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "src/components/user/user.service";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envs } from "@config/envs";

export interface JWTI {
    email: string;
    name: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: envs.jwt.secret
        });
    }

    async validate(payload: JWTI) {
        const { email } = payload;
        const user = await this.userService.findByEmail(email);
        // console.log('user jwt strategies ', user);
        // const id = user._id.toString();
        delete user.password;
        if (!user) {
            throw new UnauthorizedException('Unauthorized');
        }
        return user;
    }
}