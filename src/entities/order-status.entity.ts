import { Column, Entity } from 'typeorm';
import { Base } from '@/entities/base';
import { OrderStatus as OrderStatusEnum } from '@/shared/types/order-status.type';

@Entity('order_status')
export class OrderStatus extends Base {
  @Column({ name: 'status', type: 'enum', enum: OrderStatusEnum })
  status: OrderStatusEnum;
}
