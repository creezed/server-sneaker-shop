import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from '@/entities/base';
import { Product } from '@/entities/product.entity';
import { ShoppingCart } from '@/entities/shopping-cart.entity';
import { Size } from '@/entities/size.entity';

@Entity('shopping_cart_products')
export class ProductInShoppingCart extends Base {
  @ManyToOne(() => Product, product => product.productInShoppingCart, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => ShoppingCart, shoppingCart => shoppingCart.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'shopping_cart_id' })
  shoppingCart: ShoppingCart;

  @ManyToOne(() => Size, size => size.shoppingCartProduct, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'size_id' })
  size: Size;

  @Column({ type: 'int' })
  quantity: number;
}
