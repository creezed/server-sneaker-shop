import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Address } from '@/entities/address.entity';
import { Base } from '@/entities/base';
import { OrderStatus } from '@/entities/order-status.entity';
import { PaymentMethod } from '@/entities/payment-method.entity';
import { Product } from '@/entities/product.entity';
import { ShippingMethod } from '@/entities/shipping-method.entity';
import { User } from '@/entities/user.entity';

@Entity('order')
export class Order extends Base {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @ManyToOne(() => Address, address => address.order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_address_id' })
  userAddress: Address;

  @ManyToOne(() => PaymentMethod, payment => payment.order, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'payment_method_id' })
  paymentMethod: PaymentMethod;

  @ManyToOne(() => ShippingMethod, payment => payment.order, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'shipping_method_id' })
  shippingMethod: ShippingMethod;

  @OneToOne(() => OrderStatus)
  @JoinColumn({ name: 'status_id' })
  status: OrderStatus;

  @Column({ name: 'order_comment', type: 'text', nullable: true })
  orderComment: string;

  @ManyToMany(() => Product, product => product.orders)
  @JoinTable({ name: 'order_products' })
  products: Product[];

  @Column({ type: 'int', name: 'promotion_price' })
  promotionPrice: number;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  total: number;
}
