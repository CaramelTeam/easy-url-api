import { AbstractDocument } from "@database/abstract.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, timestamps: true, collection: "tags" })
export class TagDocument extends AbstractDocument {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    color: string;
}

export const TagSchema = SchemaFactory.createForClass(TagDocument);