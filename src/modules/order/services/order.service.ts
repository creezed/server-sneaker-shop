import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from '@/entities/order-status.entity';
import { Order } from '@/entities/order.entity';
import { User } from '@/entities/user.entity';
import { AddressService } from '@/modules/address/address.service';
import { CreateOrderDto } from '@/modules/order/dto/create-order.dto';
import { PaymentMethodService } from '@/modules/order/services/payment-method.service';
import { ShippingMethodService } from '@/modules/order/services/shipping-method.service';
import { ShoppingCartService } from '@/modules/shopping-cart/shopping-cart.service';
import { OrderStatus as OrderStatusEnum } from '@/shared/types/order-status.type';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderStatus)
    private readonly orderStatusRepository: Repository<OrderStatus>,
    private readonly addressService: AddressService,
    private readonly shippingMethodService: ShippingMethodService,
    private readonly paymentMethodService: PaymentMethodService,
    private readonly shoppingCartService: ShoppingCartService,
  ) {}

  getAll() {
    return this.orderRepository.find();
  }

  async getAllByUserId(id: number) {
    return this.orderRepository.find({
      where: { user: { id } },
      relations: { products: true, userAddress: true, status: true },
    });
  }

  async create(user: User, createOrderDto: CreateOrderDto) {
    const address = await this.addressService.validateAddressWithUser(
      user,
      createOrderDto.address,
    );
    const shippingMethod =
      await this.shippingMethodService.validateShippingMethod(
        createOrderDto.shippingMethod,
      );

    const paymentMethod = await this.paymentMethodService.validatePaymentMethod(
      createOrderDto.paymentMethod,
    );

    const shoppingCartDetail = await this.shoppingCartService.getOneWithPrice(
      user.shoppingCart.id,
    );

    if (shoppingCartDetail.total === 0) {
      throw new BadRequestException('Корзина пуста');
    }

    const status = await this.validateOrderStatus(OrderStatusEnum.PROCESSING);

    const order = this.orderRepository.create({
      user,
      userAddress: address,
      status,
      shippingMethod,
      paymentMethod,
      orderComment: createOrderDto.orderComment,
      products: shoppingCartDetail.shoppingCart.products,
      promotionPrice: shoppingCartDetail.promotionPrice,
      price: shoppingCartDetail.price,
      total: shoppingCartDetail.total,
    });
    await this.shoppingCartService.save({
      ...shoppingCartDetail.shoppingCart,
      products: [],
    });
    await this.orderRepository.save(order);
    return HttpStatus.OK;
  }

  async validateOrderStatus(statusName: OrderStatusEnum) {
    const status = await this.orderStatusRepository.findOneBy({
      status: statusName,
    });
    if (!status) {
      throw new NotFoundException('Статус не обнаружен');
    }
    return status;
  }
}
