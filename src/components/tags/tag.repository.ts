import { AbstractRepository } from "@database/abstract.repository";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { TagDocument } from "./entities/tag.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class TagRepository extends AbstractRepository<TagDocument> {
    protected readonly logger = new Logger(TagRepository.name);
    constructor(
        @InjectModel(TagDocument.name) tagModel: Model<TagDocument>
    ) {
        super(tagModel);
    }

    async create(document: Omit<TagDocument, "_id">): Promise<TagDocument> {
        this.logger.log(`Creating a new document with data ${JSON.stringify(document)}`);
        const tag = await this.model.find({ $or: [{ name: document.name }, { color: document.color }] });
        console.log('tag', tag);

        if (tag.length > 0) {
            throw new BadRequestException(`Tag with name ${document.name} or color ${document.color} already exists`);
        }
        return super.create(document);
    }

    async findOne(filterQuery: { id: string }): Promise<TagDocument> {
        return super.findOne({
            _id: filterQuery.id
        });
    }

    async find(filterQuery: any): Promise<TagDocument[]> {
        return super.find(filterQuery);
    }

    async findOneAndDelete(filterQuery: { id: string }): Promise<TagDocument> {
        return super.findOneAndDelete({ _id: filterQuery.id });
    }


}