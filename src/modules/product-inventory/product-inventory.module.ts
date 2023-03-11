import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInventoryController } from './product-inventory.controller';
import { ProductInventoryService } from './product-inventory.service';
import { ProductInventory } from '@/entities/product-inventory.entity';
import { ProductModule } from '@/modules/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductInventory]), ProductModule],
  controllers: [ProductInventoryController],
  providers: [ProductInventoryService],
})
export class ProductInventoryModule {}
