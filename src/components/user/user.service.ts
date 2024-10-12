import { Injectable, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) { }

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser(createUserDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findByEmail(email: string): Promise<UserDocument> {
    // const user = await this.userRepository.findByEmail(email);
    // delete user.password
    // return user;
    return await this.userRepository.findByEmail(email);
  }

  async findOne(id: string) {
    return await this.userRepository.getUser(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.updateUser(id, updateUserDto);
  }

  async remove(id: string) {
    return this.userRepository.softDelete(id);
  }
}
