import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductInventoryService } from './product-inventory.service';
import { ProductInventoryDto } from '@/modules/product-inventory/dto/product-inventory.dto';

@Controller('product-inventory')
export class ProductInventoryController {
  constructor(
    private readonly productInventoryService: ProductInventoryService,
  ) {}

  @Get()
  getAll() {
    return this.productInventoryService.getAll();
  }

  @Post(':productId/add/:sizeId')
  addProduct(
    @Param('productId') productId: string,
    @Param('sizeId') sizeId: string,
    @Body() productInventoryDto: ProductInventoryDto,
  ) {
    return this.productInventoryService.addProduct(
      +productId,
      +sizeId,
      productInventoryDto.quantity,
    );
  }

  @Post(':productId/remove/:sizeId')
  removeProduct(
    @Param('productId') productId: string,
    @Param('sizeId') sizeId: string,
  ) {
    return this.productInventoryService.removeProduct(+productId, +sizeId);
  }

  @Patch(':productId/update/:sizeId')
  updateQuantity(
    @Param('productId') productId: string,
    @Param('sizeId') sizeId: string,
    @Body() productInventoryDto: ProductInventoryDto,
  ) {
    return this.productInventoryService.updateQuantity(
      +productId,
      +sizeId,
      productInventoryDto.quantity,
    );
  }
}
