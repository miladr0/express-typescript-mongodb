import supertest, { SuperTest, Test } from 'supertest';

import { clearDB } from '@__tests__/jest/db';
import { fakerData } from '@__tests__/jest/factories';
import { userFactory } from '@__tests__/jest/factories';
import App from '@app';
import { AuthControllerV1 } from '@v1/index';

let server: SuperTest<Test>;
const baseUrl = '/api/v1/auth';

describe('register test suit', () => {
  beforeEach(async () => {
    await clearDB();
    const app = new App([AuthControllerV1]);
    await App.initDB();
    server = supertest(app.getServer());
  });

  test('email is not valid', async () => {
    const newUser = {
      email: 'notemail',
      username: 'abcabc',
      password: '123123',
    };
    const { body } = await server.post(`${baseUrl}/register`).send(newUser).expect(400);
    expect(body.message).toBe('email must be an email');
  });

  test('username should at least 4 character', async () => {
    const newUser = {
      email: fakerData.internet.email(),
      username: 'abc',
      password: '123123',
    };
    const { body } = await server.post(`${baseUrl}/register`).send(newUser).expect(400);
    expect(body.message).toBe('username must be longer than or equal to 4 characters');
  });

  test('password should at least 6 character', async () => {
    const newUser = {
      email: fakerData.internet.email(),
      username: 'abcd',
      password: '1231',
    };
    const { body } = await server.post(`${baseUrl}/register`).send(newUser).expect(400);
    expect(body.message).toBe('password must be longer than or equal to 6 characters');
  });

  test('email should be unique', async () => {
    const email = fakerData.internet.email();
    await userFactory({ email });
    const newUser2 = {
      email: email,
      username: 'abcd',
      password: '123123',
    };

    const { body } = await server.post(`${baseUrl}/register`).send(newUser2).expect(500);
    expect(body.message).toBe('Email already Taken');
  });

  test('email should be unique', async () => {
    const newUser = {
      email: fakerData.internet.email(),
      username: fakerData.internet.userName(),
      password: fakerData.internet.password(),
    };

    const { body } = await server.post(`${baseUrl}/register`).send(newUser).expect(201);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userResult } = newUser;

    expect(body.user).toMatchObject(userResult);
    expect(body.tokens).toBeDefined();
    expect(body.tokens.access.token).toBeDefined();
    expect(body.tokens.refresh.token).toBeDefined();
  });
});
