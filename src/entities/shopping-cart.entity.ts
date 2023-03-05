import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Base } from '@/entities/base';
import { Product } from '@/entities/product.entity';

@Entity('shopping_cart')
export class ShoppingCart extends Base {
  @Column({ type: 'decimal', default: 0 })
  total: number;

  @ManyToMany(() => Product)
  @JoinTable({ name: 'shopping_cart_products' })
  products: Product[];
}
