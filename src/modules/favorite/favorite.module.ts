import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { Favorite } from '@/entities/favorite.entity';
import { ProductModule } from '@/modules/product/product.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite]), ProductModule, UserModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
  exports: [FavoriteService],
})
export class FavoriteModule {}
