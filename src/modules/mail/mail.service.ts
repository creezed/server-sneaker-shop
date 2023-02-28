import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Response } from 'express';
import { join } from 'path';
import { User } from '@/entities/user.entity';
import { CookieService } from '@/modules/cookie/cookie.service';
import { getRandomCode } from '@/modules/mail/utils/getRandom';
import { TokenService } from '@/modules/token/token.service';
import { Services } from '@/shared/consts/services.const';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(Services.TOKEN) private readonly tokenService: TokenService,
    @Inject(Services.COOKIE) private readonly cookieService: CookieService,
  ) {}

  async sendConfirmMail(user: User, res: Response) {
    const code = getRandomCode(5);

    const token = await this.tokenService.generateMailVerificationToken(code);

    this.cookieService.sendEmailToken(res, token.email_token);

    return await this.mailerService
      .sendMail({
        to: user.email,
        subject: 'Подтверждение регистрации',
        template: join(__dirname, './templates', 'confirmReg'),
        context: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          code,
        },
      })

      .catch(e => {
        throw new HttpException(
          `Ошибка работы почты: ${JSON.stringify(e)}`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      });
  }
}
