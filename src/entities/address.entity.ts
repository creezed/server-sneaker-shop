import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '@/entities/base';
import { Order } from '@/entities/order.entity';
import { User } from '@/entities/user.entity';

@Entity('address')
export class Address extends Base {
  @Column()
  postcode: string;

  @Column()
  city: string;

  @Column()
  address_line: string;

  @Column()
  zone_name: string;

  @ManyToOne(() => User, user => user.addresses)
  user: User;

  @OneToMany(() => Order, order => order.userAddress)
  order: Order[];
}
