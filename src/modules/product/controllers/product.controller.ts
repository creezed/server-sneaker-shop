import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '@/modules/product/dto/create-product.dto';
import { UpdateProductDto } from '@/modules/product/dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return instanceToPlain(this.productService.create(createProductDto));
  }
  @Get()
  getAll() {
    return instanceToPlain(this.productService.getAll());
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return instanceToPlain(this.productService.getOne(+id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return instanceToPlain(this.productService.update(+id, updateProductDto));
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return instanceToPlain(this.productService.delete(+id));
  }
}
