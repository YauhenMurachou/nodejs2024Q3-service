import { IsString } from 'class-validator';
export class RegisterDto {
  @IsString()
  login: string;
  @IsString()
  password: string;
}
export class LoginDto {
  @IsString()
  public readonly login: string;

  @IsString()
  public readonly password: string;
}
