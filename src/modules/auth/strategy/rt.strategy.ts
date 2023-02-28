import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayloadRefresh } from '@/modules/token/types/jwt-payload.type';
import { Jwt } from '@/shared/consts/jwt.const';
import {CurrentUser} from "@/modules/auth/types/auth.type";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, Jwt.REFRESH) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.refreshToken;
        },
      ]),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayloadRefresh): CurrentUser {
    const refreshToken = req?.cookies?.refreshToken;
    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');
    return { ...payload, refreshToken };
  }
}
