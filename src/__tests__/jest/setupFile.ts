import { connect, disconnect } from './db';

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnect();
});
