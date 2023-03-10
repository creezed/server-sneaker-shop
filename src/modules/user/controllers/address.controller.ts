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
import { CreateAddressDto } from '@/modules/user/dto/create-address.dto';
import { UpdateAddressDto } from '@/modules/user/dto/update-address.dto';
import { AddressService } from '@/modules/user/services/address.service';
import { UserService } from '@/modules/user/services/user.service';
import { GetCurrentUserId } from '@/shared/decorators/get-current-user-id.decorator';

@Controller('user/address')
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
  getAddressesCurrentUser(@GetCurrentUserId() id: number) {
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
