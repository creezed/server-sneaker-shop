import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadMail } from '@/modules/token/types/jwt-payload.type';
import { Jwt } from '@/shared/consts/jwt.const';

@Injectable()
export class MailStrategy extends PassportStrategy(
  Strategy,
  Jwt.CONFIRM_EMAIL,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.emailToken;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayloadMail) {
    const emailToken = req?.cookies?.emailToken;
    if (!emailToken) throw new ForbiddenException('Код больше не действителен');
    return { ...payload, emailToken };
  }
}
