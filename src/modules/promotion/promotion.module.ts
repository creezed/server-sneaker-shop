import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionController } from './promotion.controller';
import { PromotionService } from './promotion.service';
import { ProductInPromotion } from '@/entities/product-in-promotion.entity';
import { Promotion } from '@/entities/promotion.entity';
import { ProductModule } from '@/modules/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Promotion, ProductInPromotion]),
    ProductModule,
  ],
  controllers: [PromotionController],
  providers: [PromotionService],
})
export class PromotionModule {}
