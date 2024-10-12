import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";
import { UserInterfaceJWT } from "./constants/interface/user.interface";

export const GetCurrentUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        const user: UserInterfaceJWT = req.user;
        if (!user) {
            throw new InternalServerErrorException("User not found");
        }
        return (!data) ? user : user[data];
    }
)