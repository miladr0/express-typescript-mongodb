import { faker } from '@faker-js/faker';

import User, { IUser } from '@models/users.model';

export async function userFactory(user: Partial<IUser> = {}) {
  return User.create({
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...user,
  });
}
