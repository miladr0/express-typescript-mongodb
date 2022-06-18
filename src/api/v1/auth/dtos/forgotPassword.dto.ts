import { IsEmail, IsNotEmpty } from 'class-validator';

export default class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
