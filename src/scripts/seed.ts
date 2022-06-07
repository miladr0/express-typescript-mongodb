import mongoose from 'mongoose';
import Profile from '@models/profiles.model';
import Simulator from '@models/simulators.model';
import Favorite from '@models/favorites.model';
import { DBURL } from '@config';

(async () => {
  try {
    await mongoose.connect(DBURL);

    const profile = await Profile.create({
      name: 'jack',
      nickname: 'sparrow',
      email: 'milad@btc.com',
      capital: mongoose.Types.Decimal128.fromString('123'),
      divisa: 'String',
      prefered_cryptocurrency: 'btc',
    });

    await Simulator.create({
      profile_id: profile._id,
      name: `jack in simulator`,
      dateRecorded: new Date('01/05/2021'),
      // weren't part of schema!
      // start_date: `01/05/2021`,
      // check_date: `01/05/2021`,
      // divisa: `String`,
      // Crypto_price_start: `123`,
      // Crypto_price_check: `123`,
      cryptocurrency: 'btc',
      euros: mongoose.Types.Decimal128.fromString('123'),
      price: mongoose.Types.Decimal128.fromString('123'),
      quantity: mongoose.Types.Decimal128.fromString('123'),
    });

    await Favorite.create({
      profile_id: profile._id,
      name: 'String',
      favorite1: 'String',
      favorite2: 'String',
      favorite3: 'String',
    });

    mongoose.disconnect();
  } catch (error) {
    console.log('error: ', error);
    mongoose.disconnect();
  }
})();
