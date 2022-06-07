import mongoose, { Schema, Document } from 'mongoose';
import { IsString, IsMongoId, IsEmail } from 'class-validator';
import ITimesStamp from '@common/interfaces/timestamp.interface';

export class IUser extends ITimesStamp {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export interface IUserSchema extends Document, IUser {}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    maxlength: 20,
  },
});
