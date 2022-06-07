import { faker } from '@faker-js/faker';
import Simulator, { ISimulator } from '@models/simulators.model';
import { Types } from 'mongoose';

export async function simulatorFactory(simulator: Partial<ISimulator> = {}) {
  return Simulator.create({
    profile_id: new Types.ObjectId(),
    dateRecorded: new Date(),
    cryptocurrency: 'cryptocurrency',
    euros: Types.Decimal128.fromString(faker.random.numeric(3)),
    price: Types.Decimal128.fromString(faker.random.numeric(3)),
    quantity: Types.Decimal128.fromString(faker.random.numeric(3)),
    ...simulator,
  });
}
