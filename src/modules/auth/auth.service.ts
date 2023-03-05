import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { IAuthService } from './interfaces/auth.interface';
import { User } from '@/entities/user.entity';
import { compareHash } from '@/modules/auth/utils/compareHash';
import { hashPassword } from '@/modules/auth/utils/hashPassword';
import { CookieService } from '@/modules/cookie/cookie.service';
import { ITokenService } from '@/modules/token/interfaces/token.interface';
import { JwtPayloadRefresh } from '@/modules/token/types/jwt-payload.type';
import { Tokens } from '@/modules/token/types/token.type';
import { UserService } from '@/modules/user/services/user.service';
import { Services } from '@/shared/consts/services.const';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly userService: UserService,
    @Inject(Services.TOKEN) private readonly tokenService: ITokenService,
    @Inject(Services.COOKIE) private readonly cookieService: CookieService,
  ) {}

  async login(dto: LoginUserDto, res: Response): Promise<User> {
    const user = await this.validateUser(dto);
    const tokens = await this.tokenService.generateTokenPair(user);

    if (!dto.remember) {
      this.cookieService.sendAccessToken(res, tokens.access_token);
      return user;
    }

    this.cookieService.sendAccessToken(res, tokens.access_token);
    this.cookieService.sendRefreshToken(res, tokens.refresh_token);

    return user;
  }

  async registration(dto: RegistrationUserDto): Promise<User> {
    const isGuest = await this.validateGuest(dto);

    if (!isGuest) {
      throw new BadRequestException(
        'Пользователь с этим адресом уже существует',
      );
    }

    return await this.userService.create({
      ...dto,
      password: await hashPassword(dto.password),
    });
  }

  logout(res: Response) {
    this.cookieService.deleteRefreshToken(res);
    this.cookieService.deleteAccessToken(res);
  }

  async refreshTokens(refreshToken: string, userId: number): Promise<Tokens> {
    const result = await this.tokenService.getPayload<JwtPayloadRefresh>(
      refreshToken,
    );

    if (!result) {
      throw new UnauthorizedException('Невалидный токен');
    }

    const user = await this.userService.findOneById(userId);

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    return await this.tokenService.generateTokenPair(user);
  }

  async validateUser(dto: LoginUserDto): Promise<User> {
    const user = await this.userService.findOneByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    const isValidPassword = await compareHash(dto.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Неверный пароль');
    }

    return user;
  }

  async validateGuest(dto: RegistrationUserDto): Promise<boolean> {
    const oldUser = await this.userService.findOneByEmail(dto.email);
    return !oldUser;
  }
}
