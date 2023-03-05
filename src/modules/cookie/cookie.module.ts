import { Module } from '@nestjs/common';
import { CookieService } from '@/modules/cookie/cookie.service';

@Module({
  imports: [],
  providers: [CookieService],
  exports: [CookieService],
})
export class CookieModule {}
