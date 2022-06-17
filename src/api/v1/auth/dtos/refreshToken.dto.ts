import { IsNotEmpty, IsString } from 'class-validator';

export default class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
