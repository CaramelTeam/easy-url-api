import { AbstractDocument } from "@database/abstract.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true })
export class UrlDocument extends AbstractDocument {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    url: string;

    @Prop({ required: true, default: "Unassigned" })
    tag: string;

}

export const UrlSchema = SchemaFactory.createForClass(UrlDocument);