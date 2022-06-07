import { Types } from 'mongoose';
import { faker } from '@faker-js/faker';
import Profile, { IProfile } from '@models/profiles.model';

export async function profileFactory(profile: Partial<IProfile> = {}) {
  return Profile.create({
    email: faker.internet.email(),
    name: faker.name.firstName(),
    nickname: faker.name.firstName(),
    capital: Types.Decimal128.fromString(faker.random.numeric(3)),
    divisa: 'divisa',
    prefered_cryptocurrency: 'prefered_cryptocurrency',
    ...profile,
  });
}
