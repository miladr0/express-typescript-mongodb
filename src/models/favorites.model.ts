import mongoose, { Schema, Document } from 'mongoose';
import { IsString, IsMongoId } from 'class-validator';
import ITimesStamp from '@common/interfaces/timestamp.interface';

export class IFavorite extends ITimesStamp {
  @IsMongoId()
  profile_id: string;
  @IsString()
  name: string;
  @IsString()
  favorite1: string;
  @IsString()
  favorite2: string;
  @IsString()
  favorite3: string;
}

export interface IFavoriteSchema extends Document, IFavorite {}

const favoriteSchema: Schema = new Schema(
  {
    profile_id: {
      ref: 'Profile',
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    favorite1: String,
    favorite2: String,
    favorite3: String,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IFavoriteSchema>('Favorite', favoriteSchema);
