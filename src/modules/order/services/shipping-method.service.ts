import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShippingMethod } from '@/entities/shipping-method.entity';
import { CreateShippingMethodDto } from '@/modules/order/dto/create-shipping-method.dto';
import { UpdateShippingMethodDto } from '@/modules/order/dto/update-shipping-method.dto';

@Injectable()
export class ShippingMethodService {
  constructor(
    @InjectRepository(ShippingMethod)
    private readonly shippingMethodRepository: Repository<ShippingMethod>,
  ) {}

  async create(createShippingMethodDto: CreateShippingMethodDto) {
    const shippingMethod = this.shippingMethodRepository.create(
      createShippingMethodDto,
    );
    return this.shippingMethodRepository.save(shippingMethod);
  }

  async getAll() {
    return this.shippingMethodRepository.find();
  }

  async update(id: number, updateShippingMethodDto: UpdateShippingMethodDto) {
    const shippingMethod = await this.validateShippingMethod(id);
    return this.shippingMethodRepository.update(
      { id: shippingMethod.id },
      updateShippingMethodDto,
    );
  }

  async remove(id: number) {
    const shippingMethod = await this.validateShippingMethod(id);

    return this.shippingMethodRepository.delete({ id: shippingMethod.id });
  }

  async validateShippingMethod(id: number) {
    const shippingMethod = await this.shippingMethodRepository.findOneBy({
      id,
    });

    if (!shippingMethod) {
      throw new NotFoundException('Метод доставки не найден');
    }

    return shippingMethod;
  }
}
