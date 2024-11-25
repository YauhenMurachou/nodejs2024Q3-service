import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from '../dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getall() {
    return this.userRepository.find();
  }

  async getById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return null;
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = {
      ...createUserDto,
      id: uuidv4(),
      password: hashedPassword,

      version: 1,
    };
    await this.userRepository.save(newUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _noob, ...user } = newUser;
    return { ...user, createdAt: 1, updatedAt: 1 };
  }

  async updatePassword(id: string, updatePassdto: UpdatePasswordDto) {
    const user = await this.getById(id);
    if (!user) {
      return null;
    }

    const match = await bcrypt.compare(
      updatePassdto.oldPassword,
      user.password,
    );

    if (!match || updatePassdto.oldPassword === updatePassdto.newPassword) {
      return 'not-match';
    }

    user.password = await bcrypt.hash(updatePassdto.newPassword, 10);
    // user.updatedAt = new Date();
    await this.userRepository.save(user);

    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: 1,
      updatedAt: 2,
    };
  }

  async delete(id: string) {
    const user = await this.getById(id);
    if (!user) {
      return null;
    }
    await this.userRepository.delete({ id });
    return true;
  }
}
