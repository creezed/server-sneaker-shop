import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '@/entities/base';
import { Order } from '@/entities/order.entity';

@Entity('payment_method')
export class PaymentMethod extends Base {
  @Column({ unique: true })
  value: string;

  @OneToMany(() => Order, order => order.paymentMethod)
  order: Order[];
}
