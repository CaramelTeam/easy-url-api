import { UserStatusEnum } from "src/components/user/interfaces/user-status.enum";

export interface UserInterfaceJWT {
    user_id: string;
    email: string;
    name: string;
    status: UserStatusEnum;
}