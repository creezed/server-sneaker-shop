import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from './brand.controller';
import { BrandService } from './services/brand.service';
import { Brand } from '@/entities/brand.entity';
import { BrandSize } from '@/entities/brandSize.entity';
import { BrandSizeService } from '@/modules/brand/services/brandSize.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, BrandSize])],
  controllers: [BrandController],
  providers: [BrandService, BrandSizeService],
  exports: [BrandService],
})
export class BrandModule {}
