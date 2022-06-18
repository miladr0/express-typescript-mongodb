import { Get, JsonController, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import auth from '@middlewares/auth.middleware';
import { IUser } from '@models/users.model';
import { UserService } from '@services/v1';

@JsonController('/v1/users', { transformResponse: false })
export class UserController {
  private readonly userService = new UserService();

  @Get('/')
  @OpenAPI({ summary: 'get users' })
  @ResponseSchema(IUser, { isArray: true })
  @UseBefore(auth())
  async register() {
    const users = await this.userService.findAll();

    return { users };
  }
}
