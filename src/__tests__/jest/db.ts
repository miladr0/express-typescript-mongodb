import mongoose from 'mongoose';

import config from './config';

export const connect = async () => {
  await mongoose.connect(`${process.env.MONGO_URI}/${config.Database}`);
};

export const disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoose.disconnect();
};

export const clearDB = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
