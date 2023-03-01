import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from './brand.controller';
import { BrandService } from './services/brand.service';
import { BrandSize } from '@/entities/brand-size.entity';
import { Brand } from '@/entities/brand.entity';
import { BrandSizeService } from '@/modules/brand/services/brandSize.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, BrandSize])],
  controllers: [BrandController],
  providers: [BrandService, BrandSizeService],
  exports: [BrandService],
})
export class BrandModule {}
