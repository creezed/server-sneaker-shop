import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Address } from '@/entities/address.entity';
import { Base } from '@/entities/base';
import { OrderStatus } from '@/entities/order-status.entity';
import { PaymentMethod } from '@/entities/payment-method.entity';
import { ShippingMethod } from '@/entities/shipping-method.entity';
import { User } from '@/entities/user.entity';
import { OrderStatus as OrderStatusEnum } from '@/shared/types/order-status.type';

@Entity('order')
export class Order extends Base {
  @ManyToOne(() => User)
  user: User;
  @ManyToOne(() => Address, address => address.order)
  userAddress: Address;

  @ManyToOne(() => PaymentMethod, payment => payment.order)
  @JoinColumn({ name: 'payment_method' })
  paymentMethod: PaymentMethod;

  @ManyToOne(() => ShippingMethod, payment => payment.order)
  @JoinColumn({ name: 'shipping_method' })
  shippingMethod: ShippingMethod;

  @OneToOne(() => OrderStatus)
  @JoinColumn()
  status: OrderStatusEnum;

  @Column({ name: 'order_comment', type: 'text', nullable: true })
  orderComment: string;

  @Column({ name: 'price', type: 'decimal' })
  price: number;
}
