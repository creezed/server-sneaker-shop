import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '@/entities/order.entity';
import { User } from '@/entities/user.entity';
import { AddressService } from '@/modules/address/address.service';
import { CreateOrderDto } from '@/modules/order/dto/create-order.dto';
import { OrderStatus } from '@/shared/types/order-status.type';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly addressService: AddressService,
  ) {}

  getAll() {
    return this.orderRepository.find();
  }

  async create(user: User, createOrderDto: CreateOrderDto) {
    const address = await this.addressService.validateAddress(
      createOrderDto.address,
    );
    const order = this.orderRepository.create({
      user,
      userAddress: address,
      status: OrderStatus.PROCESSING,
    });
    await this.orderRepository.save(order);
    return order;
  }
}
