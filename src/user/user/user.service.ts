import { Injectable } from '@nestjs/common';
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

  async create(CreateUserDto: CreateUserDto) {
    const newAlbum = {
      ...CreateUserDto,
      id: uuidv4(),
      password: undefined,
      version: 1,
      createdAt: Math.floor(Date.now() / 100),
      updatedAt: Math.floor(Date.now() / 100),
    };
    return this.userRepository.create(newAlbum);
    // const newUser = {
    //   ...CreateUserDto,
    //   id: uuidv4(),
    //   password: undefined,
    //   version: 1,
    //   createdAt: Math.floor(Date.now() / 100),
    //   updatedAt: Math.floor(Date.now() / 100),
    // };
    // db.user.push({
    //   ...newUser,
    //   password: await bcrypt.hash(CreateUserDto.password, 10),
    // });
    // return newUser;
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

    // await this.trackRepository.update({ albumId: id }, { albumId: null });

    await this.userRepository.delete({ id });
    return true;
    // const updatedUsers = db.user.filter((item) => item.id !== id);
    // this.user = updatedUsers;
    // if (this.user.length == db.user.length) {
    //   return false;
    // }
    // return this.user;
  }
}
