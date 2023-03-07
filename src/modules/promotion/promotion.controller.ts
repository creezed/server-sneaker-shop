import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { AddProductDto } from '@/modules/promotion/dto/add-product.dto';
import { CreatePromotionDto } from '@/modules/promotion/dto/create-promotion.dto';

@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Post()
  create(@Body() createPromotionDto: CreatePromotionDto) {
    return this.promotionService.create(createPromotionDto);
  }

  @Post(':id/add/:productId')
  addProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
    @Body() addProductDto: AddProductDto,
  ) {
    return this.promotionService.addProduct(+id, +productId, addProductDto);
  }

  @Post(':id/remove/:productId')
  removeProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return this.promotionService.removeProduct(+id, +productId);
  }
  @Get()
  getAll() {
    return this.promotionService.getAll();
  }
}
