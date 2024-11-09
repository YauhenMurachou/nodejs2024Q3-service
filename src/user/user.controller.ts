import { Body, Controller, Get, HttpCode, Post, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user/user.service';
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Get()
  @HttpCode(200)
  getall() {
    return this.UserService.getall();
  }
  @Post()
  create(@Body() createuser: CreateUserDto) {
    return this.UserService.create(createuser);
  }
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.UserService.getById(id);
  }
}
