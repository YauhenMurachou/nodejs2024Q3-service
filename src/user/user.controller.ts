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
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { UserService } from './user/user.service';
import { errors } from '../constants';
import { validate } from 'class-validator';
import { JwtAuthGuard } from '../auth/auth.guard';
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly Userservice: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async getall() {
    return await this.Userservice.getall();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async create(@Body() createuser: CreateUserDto) {
    if (!createuser.login || !createuser.password) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: errors.BAD_REQUEST,
      });
    }
    return this.Userservice.create(createuser);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async getById(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }
    const user = await this.Userservice.getById(id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: errors.NOT_FOUND,
      });
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async updatePass(
    @Param('id') id: string,
    @Body() updatePassdto: UpdatePasswordDto,
  ) {
    const updatePasswordDto = new UpdatePasswordDto();
    updatePasswordDto.newPassword = updatePassdto.newPassword;
    updatePasswordDto.oldPassword = updatePassdto.oldPassword;
    const errorsValidator = await validate(updatePasswordDto);
    if (!this.isValidId(id) || errorsValidator.length) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }
    const result = await this.Userservice.updatePassword(id, updatePassdto);

    if (result === 'not-match') {
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        error: 'PASSWORD_NOT_CHANGED',
      });
    } else if (result) {
      return result;
    } else {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: errors.NOT_FOUND,
      });
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async delUser(@Param('id') id: string) {
    if (!this.isValidId(id)) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: errors.BAD_REQUEST,
      });
    }
    const result = await this.Userservice.delete(id);
    if (result) {
      return result;
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
