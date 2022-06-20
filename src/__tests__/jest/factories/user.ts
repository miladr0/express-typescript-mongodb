import User, { IUser } from '@models/users.model';

import { fakerData } from './faker';

export async function userFactory(user: Partial<IUser> = {}) {
  return User.create({
    email: fakerData.internet.email(),
    username: fakerData.internet.userName(),
    password: fakerData.internet.password(),
    ...user,
  });
}
