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
import { CreateBrandDto } from './dto/brand/create-brand.dto';
import { UpdateBrandDto } from './dto/brand/update-brand.dto';
import { BrandService } from './services/brand.service';
import { CreateBrandSizeDto } from '@/modules/brand/dto/brandSize/create-brand-size.dto';
import { UpdateBrandSizeDto } from '@/modules/brand/dto/brandSize/update-brand-size.dto';
import { BrandSizeService } from '@/modules/brand/services/brandSize.service';

@Controller('brand')
export class BrandController {
  constructor(
    private readonly brandService: BrandService,
    private readonly brandSizeService: BrandSizeService,
  ) {}

  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Post(':id/size')
  createSize(
    @Param('id') id: string,
    @Body() createBrandSizeDto: CreateBrandSizeDto,
  ) {
    return instanceToPlain(
      this.brandSizeService.create(+id, createBrandSizeDto),
    );
  }

  @Get()
  findAll() {
    return instanceToPlain(this.brandService.findAll());
  }

  @Get(':id/size')
  findAllSizesOfOneBrand(@Param('id') id: string) {
    return instanceToPlain(this.brandSizeService.findByBrandId(+id));
  }

  @Get('sizes')
  findAllSizes() {
    return instanceToPlain(this.brandSizeService.findAll());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(+id, updateBrandDto);
  }

  @Patch('size/:id')
  updateSizes(
    @Param('id') id: string,
    @Body() updateBrandSizeDto: UpdateBrandSizeDto,
  ) {
    return this.brandSizeService.update(+id, updateBrandSizeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandService.remove(+id);
  }

  @Delete('size/:id')
  removeSize(@Param('id') id: string) {
    return this.brandSizeService.remove(+id);
  }
}
