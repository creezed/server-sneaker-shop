import { Entity, JoinTable, ManyToMany } from 'typeorm';
import { Base } from '@/entities/base';
import { Product } from '@/entities/product.entity';

@Entity('favorite')
export class Favorite extends Base {
  @ManyToMany(() => Product)
  @JoinTable({ name: 'favorite_products' })
  products: Product[];
}
