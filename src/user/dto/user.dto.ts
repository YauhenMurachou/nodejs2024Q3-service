export class CreateUserDto {
  login: string;
  password: string;
}

export class UpdatePasswordDto {
  oldPassowrd: string;
  newPassword: string;
}
