import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from '../dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import * as db from '../../db/db';

@Injectable()
export class UserService {
  user = db.user;
  getall() {
    return db.user;
  }

  async create(CreateUserDto: CreateUserDto) {
    const newUser = {
      ...CreateUserDto,
      id: uuidv4(),
      password: undefined,
      version: 1,
      createdAt: Math.floor(Date.now() / 100),
      updatedAt: Math.floor(Date.now() / 100),
    };
    db.user.push({
      ...newUser,
      password: await bcrypt.hash(CreateUserDto.password, 10),
    });
    return newUser;
  }
  getById(id: string) {
    return this.user.find((item) => item.id === id);
  }

  async updatePassword(id: string, updatePassdto: UpdatePasswordDto) {
    const user = db.user.find((item) => item.id === id);

    if (!user) {
      return false;
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

  delete(id: string) {
    const updatedUsers = db.user.filter((item) => item.id !== id);
    this.user = updatedUsers;
    if (this.user.length == db.user.length) {
      return false;
    }
    return this.user;
  }
}
