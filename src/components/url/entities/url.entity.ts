import { AbstractDocument } from "@database/abstract.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true, collection: "urls" })
export class UrlDocument extends AbstractDocument {
    @Prop({ required: true })
    title: string;

    @Prop({ required: false })
    description?: string;

    @Prop({ required: true })
    url: string;

    @Prop({ required: false, default: "Unassigned" })
    tag?: string;

}

export const UrlSchema = SchemaFactory.createForClass(UrlDocument);