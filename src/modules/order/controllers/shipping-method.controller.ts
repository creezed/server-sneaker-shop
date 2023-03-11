import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateShippingMethodDto } from '@/modules/order/dto/create-shipping-method.dto';
import { UpdateShippingMethodDto } from '@/modules/order/dto/update-shipping-method.dto';
import { ShippingMethodService } from '@/modules/order/services/shipping-method.service';

@Controller('order/shipping-method')
export class ShippingMethodController {
  constructor(private readonly shippingMethodService: ShippingMethodService) {}

  @Post()
  create(@Body() createShippingMethodDto: CreateShippingMethodDto) {
    return this.shippingMethodService.create(createShippingMethodDto);
  }
  @Get()
  getAll() {
    return this.shippingMethodService.getAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShippingMethodDto: UpdateShippingMethodDto,
  ) {
    return this.shippingMethodService.update(+id, updateShippingMethodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shippingMethodService.remove(+id);
  }
}
