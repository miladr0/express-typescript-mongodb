import mongoose, { Schema, Document } from 'mongoose';
import ITimesStamp from '@common/interfaces/timestamp.interface';
import { IsEmail, IsString } from 'class-validator';

export class IProfile extends ITimesStamp {
  @IsString()
  name: string;
  @IsString()
  nickname: string;
  @IsEmail()
  email: string;
  @IsString()
  capital: string;
  @IsString()
  divisa: string;
  @IsString()
  prefered_cryptocurrency: string;
}

export interface IProfileSchema extends Document, IProfile {}

const profileSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  capital: {
    type: Schema.Types.Decimal128,
  },
  divisa: String,
  prefered_cryptocurrency: String,
});

export default mongoose.model<IProfileSchema>('Profile', profileSchema);
