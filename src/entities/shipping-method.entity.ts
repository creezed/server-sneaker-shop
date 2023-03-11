import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '@/entities/base';
import { Order } from '@/entities/order.entity';

@Entity('shipping_method')
export class ShippingMethod extends Base {
  @Column({ unique: true })
  value: string;
  @Column({ type: 'decimal' })
  price: number;

  @OneToMany(() => Order, order => order.shippingMethod)
  order: Order[];
}
