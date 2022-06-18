import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @MinLength(6)
  password: string;
}
