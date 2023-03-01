import { Body, Controller, Get, Post } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { ProductService } from './product.service';
import { CreateProductDto } from '@/modules/product/dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll() {
    return this.productService.getAll();
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return instanceToPlain(this.productService.create(createProductDto));
  }
}
