import { IsBoolean, IsDate, IsString } from 'class-validator';
import mongoose, { Document, ObjectId, Schema } from 'mongoose';

import { MODELS, TokenTypes } from '@common/constants';
import ITimesStamp from '@common/interfaces/timestamp.interface';
import toJSON from '@utils/toJSON.plugin';

export class IToken extends ITimesStamp {
  @IsString()
  token: string;

  @IsString()
  userId: ObjectId;

  @IsString()
  type: string;

  @IsDate()
  expires: Date;

  @IsBoolean()
  blacklisted: boolean;
}

export interface ITokenSchema extends Document, IToken {}

const tokenSchema: Schema = new Schema(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: MODELS.USERS,
      required: true,
    },
    type: {
      type: String,
      enum: [TokenTypes.ACCESS, TokenTypes.REFRESH, TokenTypes.RESET_PASSWORD],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

tokenSchema.plugin(toJSON);

export default mongoose.model<ITokenSchema>(MODELS.TOKENS, tokenSchema);
