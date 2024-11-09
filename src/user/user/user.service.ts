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

  create(CreateUserDto: CreateUserDto) {
    const newUser = {
      ...CreateUserDto,
      id: uuidv4(),
      password: undefined,
      version: 1,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
    };
    db.user.push(newUser);
    return newUser;
  }
  getById(id: string) {
    console.log('getById-----', id);
    return this.user.find((item) => item.id === id);
  }

  // async updatePassword(id: string, updatePassdto: UpdatePasswordDto) {
  // }

  delete(id: string) {
    const updatedUsers = db.user.filter((item) => item.id !== id);
    this.user = updatedUsers;
    if (this.user.length == db.user.length) {
      return false;
    }
    return this.user;
  }
}
