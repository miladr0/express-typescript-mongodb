import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';

import Favorite, { IFavorite } from '@models/favorites.model';

export async function favoriteFactory(favorite: Partial<IFavorite> = {}) {
  return Favorite.create({
    profile_id: new Types.ObjectId(),
    name: faker.random.word(),
    favorite1: faker.music.genre(),
    favorite2: faker.vehicle.color(),
    favorite3: faker.word.adjective(),
    ...favorite,
  });
}
