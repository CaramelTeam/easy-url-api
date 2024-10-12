import { AbstractDocument } from "@database/abstract.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserStatusEnum } from "../interfaces/user-status.enum";

@Schema({ versionKey: false, timestamps: true, collection: "users" })
export class UserDocument extends AbstractDocument {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: UserStatusEnum.ACTIVE })
    status?: string;

    @Prop()
    photo_url?: string;

}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
