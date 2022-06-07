import ITimesStamp from '@common/interfaces/timestamp.interface';
import { IsDate, IsMongoId, IsNumber, IsString } from 'class-validator';
import mongoose, { Schema, Document } from 'mongoose';

export class ISimulator extends ITimesStamp {
  @IsMongoId()
  profile_id: string;
  @IsDate()
  dateRecorded: Date;
  @IsString()
  cryptocurrency: string;
  @IsNumber()
  euros: number;
  @IsNumber()
  price: number;
  @IsNumber()
  quantity: number;
}

export interface ISimulatorSchema extends Document, ISimulator {}

const simulatorSchema = new Schema(
  {
    profile_id: {
      ref: 'Profile',
      type: Schema.Types.ObjectId,
      required: true,
    },
    dateRecorded: Date,
    cryptocurrency: String,
    euros: {
      type: Schema.Types.Decimal128,
      required: true,
      min: 0,
    },
    price: {
      type: Schema.Types.Decimal128,
      required: true,
      min: 0,
    },
    quantity: {
      type: Schema.Types.Decimal128,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ISimulatorSchema>('Simulator', simulatorSchema);
