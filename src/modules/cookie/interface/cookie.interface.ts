import { Response } from 'express';

export interface ICookieService {
  sendRefreshToken(res: Response, refreshToken: string): void;
  sendAccessToken(res: Response, accessToken: string): void;
  sendEmailToken(res: Response, emailToken: string): void;
  deleteAccessToken(res: Response): void;
  deleteRefreshToken(res: Response): void;
  deleteEmailToken(res: Response): void;
}
