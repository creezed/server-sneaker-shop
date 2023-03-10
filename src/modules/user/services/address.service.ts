import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '@/entities/address.entity';
import { User } from '@/entities/user.entity';
import { CreateAddressDto } from '@/modules/user/dto/create-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}
  async create(user: User, createAddressDto: CreateAddressDto) {
    const address = this.addressRepository.create({
      user,
      ...createAddressDto,
    });
    await this.addressRepository.save(address);

    return address;
  }

  findAllByUserId(userId: number) {
    return this.addressRepository.findBy({ user: { id: userId } });
  }

  async update(
    user: User,
    updateAddressDto: CreateAddressDto,
    addressId: number,
  ) {
    const address = await this.validateAddress(addressId);

    return this.addressRepository.update(
      { user, id: address.id },
      updateAddressDto,
    );
  }

  async remove(user: User, addressId: number) {
    const address = await this.validateAddress(addressId);
    return this.addressRepository.delete({ user, id: address.id });
  }

  async validateAddress(addressId: number) {
    const address = await this.addressRepository.findOneBy({ id: addressId });
    if (!address) {
      throw new NotFoundException('Адресс не найден');
    }

    return address;
  }
}
