import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Size } from '@/entities/size.entity';
import { BrandModule } from '@/modules/brand/brand.module';
import { SizeController } from '@/modules/size/size.controller';
import { SizeService } from '@/modules/size/size.service';

@Module({
  imports: [TypeOrmModule.forFeature([Size]), BrandModule],
  controllers: [SizeController],
  providers: [SizeService],
  exports: [SizeService],
})
export class SizeModule {}
