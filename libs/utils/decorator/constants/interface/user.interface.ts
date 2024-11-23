import { UserStatusEnum } from "src/components/user/interfaces/user-status.enum";

export interface UserInterfaceJWT {
    _id: string;
    email: string;
    name: string;
    status: UserStatusEnum;
}