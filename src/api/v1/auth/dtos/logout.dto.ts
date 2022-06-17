import { IsNotEmpty, IsString } from 'class-validator';

export default class LogoutDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
