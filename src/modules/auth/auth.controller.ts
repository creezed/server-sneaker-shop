import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { IAuthService } from './interfaces/auth.interface';
import { CurrentUser } from '@/modules/auth/types/auth.type';
import { Routes } from '@/shared/consts/routes.const';
import { Services } from '@/shared/consts/services.const';
import { GetCurrentUser } from '@/shared/decorators/get-current-user.decorator';
import { Public } from '@/shared/decorators/public.decorator';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private readonly authService: IAuthService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('local/registration')
  async registration(@Body() dto: RegistrationUserDto) {
    return instanceToPlain(await this.authService.registration(dto));
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('local/login')
  async login(@Body() dto: LoginUserDto, @Res() res: Response) {
    return res
      .status(res.statusCode)
      .json(instanceToPlain(await this.authService.login(dto, res)));
  }

  @Get('refresh')
  async refresh(@GetCurrentUser() user: CurrentUser) {
    const { refreshToken } = user;
    return this.authService.refreshTokens(refreshToken, user.id);
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res() res: Response) {
    this.authService.logout(res);
    return res.status(res.statusCode).json();
  }
}
