import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './modules/address/address.module';
import { BrandModule } from './modules/brand/brand.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { ImagesModule } from './modules/images/images.module';
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';
import { ProductInventoryModule } from './modules/product-inventory/product-inventory.module';
import { PromotionModule } from './modules/promotion/promotion.module';
import { ShoppingCartModule } from './modules/shopping-cart/shopping-cart.module';
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
    BrandModule,
    ImagesModule,
    ProductModule,
    PromotionModule,
    OrderModule,
    AddressModule,
    ShoppingCartModule,
    FavoriteModule,
    ProductInventoryModule,
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
