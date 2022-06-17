import jsonwebtoken from 'jsonwebtoken';
import moment from 'moment';
import { ObjectId } from 'mongoose';

import { TokenTypes } from '@common/constants';
import { jwt } from '@config';
import Tokens from '@models/tokens.model';
import { IUserSchema } from '@models/users.model';

export class TokenService {
  async generateAuthTokens(user: IUserSchema) {
    const accessTokenExpire = moment().add(jwt.accessExpireIn as moment.unitOfTime.DurationConstructor, jwt.accessExpireFormat);
    const accessToken = this.generateToken(user.id, accessTokenExpire.unix(), TokenTypes.ACCESS);

    const refreshTokenExpire = moment().add(jwt.refreshExpireIn as moment.unitOfTime.DurationConstructor, jwt.refreshExpireFormat);
    const refreshToken = this.generateToken(user.id, refreshTokenExpire.unix(), TokenTypes.REFRESH);

    await this.saveToken(refreshToken, user.id, refreshTokenExpire.toDate(), TokenTypes.REFRESH);

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpire.unix(),
      },
      refresh: {
        token: refreshToken,
        expire: refreshTokenExpire.unix(),
      },
    };
  }

  generateToken(userId: ObjectId, expire: number, type: string) {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expire,
      type,
    };

    return jsonwebtoken.sign(payload, jwt.secret);
  }

  async saveToken(token: string, userId: ObjectId, expires: Date, type: TokenTypes, blacklisted = false) {
    return await Tokens.create({
      token,
      userId,
      expires,
      type,
      blacklisted,
    });
  }

  async verifyToken(token: string, type: string) {
    const payload = jsonwebtoken.verify(token, jwt.secret);
    const tokenDoc = await Tokens.findOne({ token, type, userId: payload.sub, blacklisted: false });
    if (!tokenDoc) {
      throw new Error('Token not found');
    }
    return tokenDoc;
  }
}
