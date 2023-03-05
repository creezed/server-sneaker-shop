import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy } from './strategy/at.strategy';
import { RtStrategy } from './strategy/rt.strategy';
import { MailStrategy } from '@/modules/auth/strategy/mail.strategy';
import { CookieModule } from '@/modules/cookie/cookie.module';
import { MailModule } from '@/modules/mail/mail.module';
import { TokenModule } from '@/modules/token/token.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [UserModule, MailModule, CookieModule, TokenModule],
  controllers: [AuthController],
  providers: [RtStrategy, AtStrategy, MailStrategy, AuthService],
})
export class AuthModule {}
