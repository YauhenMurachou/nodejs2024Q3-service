import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from '../dto/auth.dto';
import { AuthHelper } from '../auth.helper';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<UserEntity | never> {
    const { login, password }: RegisterDto = body;

    let user: UserEntity = await this.repository.findOne({
      where: { login: login },
    });
    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    user = new UserEntity();

    user.login = login;
    user.version = 0;
    user.password = this.helper.encodePassword(password);
    // this.repository.update(user.id, { createdAt: new Date().toString() });
    return this.repository.save(user);
  }

  public async login(body: LoginDto): Promise<string | never> {
    const { login, password }: LoginDto = body;
    const user: UserEntity = await this.repository.findOne({
      where: { login },
    });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Forbidden resource', HttpStatus.FORBIDDEN);
    }

    // this.repository.update(user.id, { updatedAt: new Date().toString() });

    return this.helper.generateToken(user);
  }

  public async refresh(user: UserEntity): Promise<string> {
    // this.repository.update(user.id, { lastLoginAt: new Date() });

    return this.helper.generateToken(user);
  }
}
