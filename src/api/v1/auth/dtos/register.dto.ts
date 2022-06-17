import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export default class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(15)
  username: string;

  @MinLength(6)
  password: string;
}
