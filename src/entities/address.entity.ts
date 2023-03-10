import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '@/entities/base';
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
}
