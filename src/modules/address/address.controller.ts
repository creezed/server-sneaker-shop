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
import { AddressService } from '@/modules/address/address.service';
import { CreateAddressDto } from '@/modules/address/dto/create-address.dto';
import { UpdateAddressDto } from '@/modules/address/dto/update-address.dto';
import { UserService } from '@/modules/user/services/user.service';
import { GetCurrentUserId } from '@/shared/decorators/get-current-user-id.decorator';

@Controller('address')
export class AddressController {
  constructor(
    private readonly addressService: AddressService,
    private readonly userService: UserService,
  ) {}

  @Post('add')
  async create(
    @GetCurrentUserId() id: number,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    const user = await this.userService.validateUser(id);
    return instanceToPlain(this.addressService.create(user, createAddressDto));
  }

  @Get()
  findAllByUserId(@GetCurrentUserId() id: number) {
    return instanceToPlain(this.addressService.findAllByUserId(id));
  }

  @Patch(':id')
  async update(
    @GetCurrentUserId() id: number,
    @Param('id') addressId: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    const user = await this.userService.validateUser(id);
    return instanceToPlain(
      this.addressService.update(user, updateAddressDto, +addressId),
    );
  }

  @Delete('remove/:id')
  async remove(@GetCurrentUserId() id: number, @Param('id') addressId: string) {
    const user = await this.userService.validateUser(id);
    return instanceToPlain(this.addressService.remove(user, +addressId));
  }
}
