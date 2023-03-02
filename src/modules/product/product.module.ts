import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductAbout } from '@/entities/product-about.entity';
import { ProductImages } from '@/entities/product-images.entity';
import { Product } from '@/entities/product.entity';
import { BrandModule } from '@/modules/brand/brand.module';
import { ImagesModule } from '@/modules/images/images.module';
import { ProductImageController } from '@/modules/product/controllers/productImage.controller';
import { ProductImageService } from '@/modules/product/services/productImage.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductAbout, ProductImages]),
    BrandModule,
    ImagesModule,
  ],
  controllers: [ProductController, ProductImageController],
  providers: [ProductService, ProductImageService],
})
export class ProductModule {}
