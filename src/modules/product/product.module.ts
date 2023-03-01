import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductAbout } from '@/entities/product-about.entity';
import { ProductImages } from '@/entities/product-images.entity';
import { Product } from '@/entities/product.entity';
import { BrandModule } from '@/modules/brand/brand.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductAbout, ProductImages]),
    BrandModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
