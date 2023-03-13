import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Base } from '@/entities/base';
import { ProductInShoppingCart } from '@/entities/product-in-shopping-cart.entity';
import { User } from '@/entities/user.entity';

@Entity('shopping_cart')
export class ShoppingCart extends Base {
  @OneToOne(() => User, user => user.shoppingCart, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => ProductInShoppingCart,
    productInShoppingCart => productInShoppingCart.shoppingCart,
  )
  products: ProductInShoppingCart[];
}
