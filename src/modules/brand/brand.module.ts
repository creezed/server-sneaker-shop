import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { Brand } from '@/entities/brand.entity';
import { Size } from '@/entities/size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Size])],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [BrandService],
})
export class BrandModule {}
