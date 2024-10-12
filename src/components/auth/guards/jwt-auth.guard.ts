import { PUBLIC_ROUTE } from "@libs/utils/decorator/constants";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.get(PUBLIC_ROUTE, context.getHandler());
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }

}