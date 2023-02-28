import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandModule } from './modules/brand/brand.module';
import { ImagesModule } from './modules/images/images.module';
import { RolesModule } from './modules/roles/roles.module';
import { UserModule } from './modules/user/user.module';
import { getTypeormConfig } from '@/config/typeorm/getTypeOrmConfig';
import { AuthModule } from '@/modules/auth/auth.module';
import { AtGuard } from '@/shared/guards/at.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: getTypeormConfig,
    }),
    AuthModule,
    UserModule,
    RolesModule,
    BrandModule,
    ImagesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
