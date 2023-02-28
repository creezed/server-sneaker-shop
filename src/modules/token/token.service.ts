import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/entities/user.entity';
import { ITokenService } from '@/modules/token/interfaces/token.interface';
import {
  JwtPayloadAccess,
  JwtPayloadMail,
  JwtPayloadRefresh,
} from '@/modules/token/types/jwt-payload.type';
import {
  AccessToken,
  MailVerificationToken,
  Tokens,
} from '@/modules/token/types/token.type';

@Injectable()
export class TokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateTokenPair(user: User): Promise<Tokens> {
    const jwtPayload: JwtPayloadAccess & JwtPayloadRefresh = {
      id: user.id,
      email: user.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '30d',
      }),
    ]);

    return {
      refresh_token: accessToken,
      access_token: refreshToken,
    };
  }

  async generateAccessToken(user: User): Promise<AccessToken> {
    const jwtPayload: JwtPayloadAccess = {
      id: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(jwtPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1d',
    });

    return {
      access_token: accessToken,
    };
  }

  async generateMailVerificationToken(
    code: number,
  ): Promise<MailVerificationToken> {
    const jwtPayload: JwtPayloadMail = {
      code,
    };

    const emailToken = await this.jwtService.signAsync(jwtPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    return {
      email_token: emailToken,
    };
  }

  async getPayload<T extends object>(token: string): Promise<T> {
    return await this.jwtService.verifyAsync<T>(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
