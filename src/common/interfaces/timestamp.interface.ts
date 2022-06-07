import { IsDate } from 'class-validator';

export default class ITimesStamp {
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt: Date;
}
