import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { Base } from '@/entities/base';
import { Product } from '@/entities/product.entity';
import { User } from '@/entities/user.entity';

@Entity('favorite')
export class Favorite extends Base {
  @OneToOne(() => User, user => user.favorite, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
  @ManyToMany(() => Product)
  @JoinTable({ name: 'favorite_products' })
  products: Product[];
}
