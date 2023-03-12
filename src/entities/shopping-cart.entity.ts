import { Entity, JoinTable, ManyToMany } from 'typeorm';
import { Base } from '@/entities/base';
import { Product } from '@/entities/product.entity';

@Entity('shopping_cart')
export class ShoppingCart extends Base {
  @ManyToMany(() => Product)
  @JoinTable({ name: 'shopping_cart_products' })
  products: Product[];
}
