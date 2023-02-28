import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from '@/modules/token/token.service';
import { Services } from '@/shared/consts/services.const';

@Module({
  imports: [JwtModule],
  providers: [
    {
      useClass: TokenService,
      provide: Services.TOKEN,
    },
  ],
  exports: [
    {
      useClass: TokenService,
      provide: Services.TOKEN,
    },
  ],
})
export class TokenModule {}
