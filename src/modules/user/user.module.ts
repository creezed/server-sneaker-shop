import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';
import { Address } from '@/entities/address.entity';
import { Favorite } from '@/entities/favorite.entity';
import { Role } from '@/entities/role.entity';
import { ShoppingCart } from '@/entities/shopping-cart.entity';
import { User } from '@/entities/user.entity';
import { ProductModule } from '@/modules/product/product.module';
import { AddressController } from '@/modules/user/controllers/address.controller';
import { FavoriteController } from '@/modules/user/controllers/favorite.controller';
import { ProfileController } from '@/modules/user/controllers/profile.controller';
import { ShoppingCartController } from '@/modules/user/controllers/shopping-cart.controller';
import { AddressService } from '@/modules/user/services/address.service';
import { FavoriteService } from '@/modules/user/services/favorite.service';
import { RolesService } from '@/modules/user/services/roles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ShoppingCart, Favorite, Role, Address]),
    ProductModule,
  ],
  controllers: [
    UserController,
    ShoppingCartController,
    FavoriteController,
    ProfileController,
    AddressController,
  ],
  providers: [
    UserService,
    ShoppingCartService,
    FavoriteService,
    RolesService,
    AddressService,
  ],
  exports: [UserService],
})
export class UserModule {}
