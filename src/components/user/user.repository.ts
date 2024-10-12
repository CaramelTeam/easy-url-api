import { AbstractRepository } from "@database/abstract.repository";
import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { UserDocument } from "./entities/user.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AdaptersKey } from "libs/adapters/keys.adapters";
import { BcryptAdapterInterface } from "libs/adapters/bcrypt/bcrypt.interface";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserStatusEnum } from "./interfaces/user-status.enum";

@Injectable()
export class UserRepository extends AbstractRepository<UserDocument> {
    protected readonly logger = new Logger(UserRepository.name);

    constructor(
        @InjectModel(UserDocument.name) userModel: Model<UserDocument>,
        @Inject(AdaptersKey.BCRYPT_KEY)
        private readonly bcryptAdapter: BcryptAdapterInterface
    ) {
        super(userModel);
    }

    async createUser(createUserDto: Omit<UserDocument, "_id">): Promise<UserDocument> {
        const pass = this.bcryptAdapter.encryptString(createUserDto.password);
        try {
            this.logger.log(`Creating user with email: ${createUserDto.email}`);
            return await super.create({ ...createUserDto, password: pass });
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException('Error creating user');
        }
    }

    async findByEmail(email: string): Promise<UserDocument> {

        this.logger.log(`Finding user by email: ${email}`);
        return await super.findOne({
            email
        });
    }

    async getUser(id: string): Promise<UserDocument> {
        this.logger.log(`Finding user by id: ${id}`);
        const user = await super.findOne({ _id: id, status: UserStatusEnum.ACTIVE });
        delete user.password
        return user;
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
        this.logger.log(`Updating user with id: ${id}`);
        const user = await super.findOneAndUpdate({ _id: id, status: UserStatusEnum.ACTIVE }, updateUserDto);
        delete user.password
        return user;
    }

    async softDelete(id: string): Promise<UserDocument> {
        this.logger.log(`Removing user with id: ${id}`);
        return await super.findOneAndUpdate({ _id: id, status: UserStatusEnum.ACTIVE }, { status: UserStatusEnum.DELETED });
    }

}