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
import { CreateSizeDto } from '@/modules/size/dto/create-size.dto';
import { UpdateSizeDto } from '@/modules/size/dto/update-size.dto';
import { SizeService } from '@/modules/size/size.service';

@Controller('size')
export class SizeController {
  constructor(private readonly brandSizeService: SizeService) {}

  @Post(':id/size')
  createSize(
    @Param('id') id: string,
    @Body() createBrandSizeDto: CreateSizeDto,
  ) {
    return instanceToPlain(
      this.brandSizeService.create(+id, createBrandSizeDto),
    );
  }

  @Get(':id/size')
  findAllSizesOfOneBrand(@Param('id') id: string) {
    return instanceToPlain(this.brandSizeService.findByBrandId(+id));
  }

  @Get('sizes')
  findAllSizes() {
    return instanceToPlain(this.brandSizeService.findAll());
  }

  @Patch('size/:id')
  updateSizes(
    @Param('id') id: string,
    @Body() updateBrandSizeDto: UpdateSizeDto,
  ) {
    return this.brandSizeService.update(+id, updateBrandSizeDto);
  }

  @Delete('size/:id')
  removeSize(@Param('id') id: string) {
    return this.brandSizeService.remove(+id);
  }
}
