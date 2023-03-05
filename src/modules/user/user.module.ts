import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';
import { Favorite } from '@/entities/favorite.entity';
import { ShoppingCart } from '@/entities/shopping-cart.entity';
import { User } from '@/entities/user.entity';
import { ProductModule } from '@/modules/product/product.module';
import { RolesModule } from '@/modules/roles/roles.module';
import { FavoriteController } from '@/modules/user/controllers/favorite.controller';
import { ProfileController } from '@/modules/user/controllers/profile.controller';
import { ShoppingCartController } from '@/modules/user/controllers/shopping-cart.controller';
import { FavoriteService } from '@/modules/user/services/favorite.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ShoppingCart, Favorite]),
    ProductModule,
    RolesModule,
  ],
  controllers: [
    UserController,
    ShoppingCartController,
    FavoriteController,
    ProfileController,
  ],
  providers: [UserService, ShoppingCartService, FavoriteService],
  exports: [UserService],
})
export class UserModule {}
