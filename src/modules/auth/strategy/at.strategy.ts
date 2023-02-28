import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadAccess } from '@/modules/token/types/jwt-payload.type';
import { Jwt } from '@/shared/consts/jwt.const';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, Jwt.ACCESS) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.accessToken;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayloadAccess) {
    const accessToken = req?.cookies?.accessToken;
    if (!accessToken) throw new ForbiddenException('Access token malformed');
    return payload;
  }
}
