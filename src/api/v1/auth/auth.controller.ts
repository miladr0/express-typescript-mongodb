import { Body, HttpCode, JsonController, Post, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { validationMiddleware } from '@middlewares/validation.middleware';
import { IUser } from '@models/users.model';
import { AuthService, TokenService, UserService } from '@services/v1';

import ForgotPasswordDto from './dtos/forgotPassword.dto';
import LoginDto, { LoginResponseSchema } from './dtos/login.dto';
import LogoutDto from './dtos/logout.dto';
import RefreshTokenDto from './dtos/refreshToken.dto';
import RegisterDto from './dtos/register.dto';
import ResetPasswordDto from './dtos/resetPassword.dto';

@JsonController('/v1/auth', { transformResponse: false })
export class AuthController {
  private readonly tokenService = new TokenService();
  private readonly userService = new UserService();
  private readonly authService = new AuthService();

  @Post('/register')
  @HttpCode(201)
  @OpenAPI({ summary: 'register new user' })
  @ResponseSchema(IUser)
  @UseBefore(validationMiddleware(RegisterDto, 'body'))
  async register(@Body() userData: RegisterDto) {
    const user = await this.userService.createUser(userData);
    const tokens = await this.tokenService.generateAuthTokens(user);

    return { user, tokens };
  }

  @Post('/login')
  @OpenAPI({
    description: 'user data and tokens',
    responses: LoginResponseSchema,
  })
  @UseBefore(validationMiddleware(LoginDto, 'body'))
  async login(@Body() userData: LoginDto) {
    const user = await this.authService.loginUserWithEmailAndPassword(userData.email, userData.password);
    const tokens = await this.tokenService.generateAuthTokens(user);

    return { user, tokens };
  }

  @Post('/logout')
  @OpenAPI({ summary: 'logout the user' })
  @UseBefore(validationMiddleware(LogoutDto, 'body'))
  async logout(@Body() userData: LogoutDto) {
    await this.authService.logout(userData.refreshToken);

    return { message: 'logout success' };
  }

  @Post('/refresh-tokens')
  @OpenAPI({ description: 'renew user token and refresh token', responses: LoginResponseSchema })
  @UseBefore(validationMiddleware(RefreshTokenDto, 'body'))
  async refreshToken(@Body() userData: RefreshTokenDto) {
    const result = await this.authService.refreshAuth(userData.refreshToken);

    return { ...result };
  }

  @Post('/forgot-password')
  @OpenAPI({ summary: 'send reset token to reset the password' })
  @UseBefore(validationMiddleware(ForgotPasswordDto, 'body'))
  async forgotPassword(@Body() userData: ForgotPasswordDto) {
    const token = await this.tokenService.generateResetPasswordToken(userData.email);

    // should use email service to send the token to email owner, not return it!
    return { token };
  }

  @Post('/reset-password')
  @OpenAPI({ summary: 'reset user password' })
  @UseBefore(validationMiddleware(ResetPasswordDto, 'body'))
  async resetPassword(@Body() userData: ResetPasswordDto) {
    await this.authService.resetPassword(userData.token, userData.password);

    return { message: 'password successfully updated' };
  }
}
