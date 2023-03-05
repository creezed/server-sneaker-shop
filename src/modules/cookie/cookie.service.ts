import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Cookie } from '@/modules/cookie/consts/cookie.const';

@Injectable()
export class CookieService {
  sendRefreshToken(res: Response, refreshToken: string) {
    res.cookie(Cookie.REFRESH_TOKEN, refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }

  sendAccessToken(res: Response, accessToken: string) {
    res.cookie(Cookie.ACCESS_TOKEN, accessToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }

  sendEmailToken(res: Response, emailToken: string) {
    res.cookie(Cookie.EMAIL_TOKEN, emailToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }

  deleteAccessToken(res: Response) {
    res.clearCookie(Cookie.ACCESS_TOKEN);
  }

  deleteRefreshToken(res: Response) {
    res.clearCookie(Cookie.REFRESH_TOKEN);
  }

  deleteEmailToken(res: Response) {
    res.clearCookie(Cookie.EMAIL_TOKEN);
  }
}
