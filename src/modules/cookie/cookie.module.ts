import { Module } from '@nestjs/common';
import { CookieService } from '@/modules/cookie/cookie.service';
import { Services } from '@/shared/consts/services.const';

@Module({
  imports: [],
  providers: [
    {
      useClass: CookieService,
      provide: Services.COOKIE,
    },
  ],
  exports: [
    {
      useClass: CookieService,
      provide: Services.COOKIE,
    },
  ],
})
export class CookieModule {}
