import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { UrlDocument } from "./entities/url.entity";
import { AbstractRepository } from "@database/abstract.repository";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose"
import { count } from "console";
@Injectable()
export class UrlRepository extends AbstractRepository<UrlDocument> {
    protected readonly logger = new Logger(UrlRepository.name);
    constructor(
        @InjectModel(UrlDocument.name) urlModel: Model<UrlDocument>
    ) {
        super(urlModel);
    }

    async create(document: Omit<UrlDocument, "_id">): Promise<UrlDocument> {
        this.logger.log(`Creating a new document with data ${JSON.stringify(document)}`);
        return super.create(document);
    }

    async findOne(filterQuery: { id: string }): Promise<UrlDocument> {
        return super.findOne({
            _id: filterQuery.id
        });
    }

    async findByTag(tag: string): Promise<UrlDocument[]> {
        return super.find({
            tag: { $regex: tag, $options: 'i' }
        })
    }

    async findOneAndUpdate(
        filterQuery: { id: string },
        update: any
    ): Promise<UrlDocument> {
        return super.findOneAndUpdate({ _id: filterQuery.id }, update);
    }

    async find(filterQuery: { user_id: string }): Promise<UrlDocument[]> {
        console.log('filterQuery', filterQuery.user_id);
        const data = await this.model.aggregate([
            {
                $match: { user_id: filterQuery.user_id.toString() }
            },
            {
                $group: {
                    _id: "$tag",
                    count: { $sum: 1 },
                    urls: { $push: "$$ROOT" },
                }
            },
            {
                $sort: { count: -1 }
            }
        ])

        if (data.length === 0) {
            throw new NotFoundException("No URLs found");
        }
        return data;
        // return await super.find({ user_id: filterQuery.user_id });
    }

    async findOneAndDelete(filterQuery: { id: string }): Promise<UrlDocument> {
        return super.findOneAndDelete({ _id: filterQuery.id });

    }
}