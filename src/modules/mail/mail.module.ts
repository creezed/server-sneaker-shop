import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailConfig } from '@/config/mail/getMailConfig';
import { CookieModule } from '@/modules/cookie/cookie.module';
import { MailService } from '@/modules/mail/mail.service';
import { TokenModule } from '@/modules/token/token.module';

@Module({
  imports: [
    TokenModule,
    CookieModule,
    MailerModule.forRootAsync({
      useFactory: getMailConfig,
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
