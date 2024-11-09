import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Param,
  BadRequestException,
  HttpStatus,
  NotFoundException,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { UserService } from './user/user.service';
import { errors } from '../constants';
@Controller('user')
export class UserController {
  constructor(private readonly Userservice: UserService) {}
  @Get()
  @HttpCode(200)
  getall() {
    return this.Userservice.getall();
  }
  @Post()
  @HttpCode(201)
  create(@Body() createuser: CreateUserDto) {
    if (!createuser.login || !createuser.password) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: errors.BAD_REQUEST,
      });
    }
    return this.Userservice.create(createuser);
  }
  @Get(':id')
  @HttpCode(200)
  getById(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }

    if (this.Userservice.getById(id)) {
      return this.Userservice.getById(id);
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: errors.NOT_FOUND,
      });
    }
  }

  @Put(':id')
  @HttpCode(200)
  updatePass(
    @Param('id') id: string,
    @Body() updatePassdto: UpdatePasswordDto,
  ) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }
    // if (this.Userservice.updatePassword(id, updatePassdto)) {
    //   return this.Userservice.updatePassword(id, updatePassdto);
    // }
    else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: errors.NOT_FOUND,
      });
    }
  }

  @Delete(':id')
  @HttpCode(204)
  delUser(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }
    if (this.Userservice.delete(id)) {
      return this.Userservice.delete(id);
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: errors.NOT_FOUND,
      });
    }
  }

  private isValidId(id: string): boolean {
    return id.split('-').length === 5;
  }
}
