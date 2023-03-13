import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductInShoppingCart } from '@/entities/product-in-shopping-cart.entity';
import { ShoppingCart } from '@/entities/shopping-cart.entity';
import { ProductModule } from '@/modules/product/product.module';
import { SizeModule } from '@/modules/size/size.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShoppingCart, ProductInShoppingCart]),
    UserModule,
    ProductModule,
    SizeModule,
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
  exports: [ShoppingCartService],
})
export class ShoppingCartModule {}
