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
    console.log('CreateUserDto', createUserDto);
    const newUser = {
      ...createUserDto,
      id: uuidv4(),
      // password: undefined,
      version: 1,
      // createdAt: Date.now(),
      // updatedAt: Date.now(),
    };
    const newUserSave = await this.userRepository.create(newUser);
    await this.userRepository.save(newUserSave);
    const { password: _noob, ...user } = newUserSave;
    return user;
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

    if (!match) {
      return 'not-match';
    }

    user.password = await bcrypt.hash(updatePassdto.newPassword, 10);
    user.updatedAt = Math.floor(Date.now() / 100);

    return {
      id: user.id,
      login: user.login,
      version: user.version + 1,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
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
