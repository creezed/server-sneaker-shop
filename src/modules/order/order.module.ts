import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { OrderStatus } from '@/entities/order-status.entity';
import { Order } from '@/entities/order.entity';
import { PaymentMethod } from '@/entities/payment-method.entity';
import { ShippingMethod } from '@/entities/shipping-method.entity';
import { AddressModule } from '@/modules/address/address.module';
import { PaymentMethodController } from '@/modules/order/controllers/payment-method.controller';
import { ShippingMethodController } from '@/modules/order/controllers/shipping-method.controller';
import { PaymentMethodService } from '@/modules/order/services/payment-method.service';
import { ShippingMethodService } from '@/modules/order/services/shipping-method.service';
import { ShoppingCartModule } from '@/modules/shopping-cart/shopping-cart.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderStatus,
      ShippingMethod,
      PaymentMethod,
    ]),
    AddressModule,
    ShoppingCartModule,
    UserModule,
  ],
  controllers: [
    OrderController,
    ShippingMethodController,
    PaymentMethodController,
  ],
  providers: [OrderService, ShippingMethodService, PaymentMethodService],
})
export class OrderModule {}
