import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Base } from '@/entities/base';
import { Brand } from '@/entities/brand.entity';
import { ProductInShoppingCart } from '@/entities/product-in-shopping-cart.entity';
import { ProductInventory } from '@/entities/product-inventory.entity';
import { Gender } from '@/shared/types/gender.type';

@Entity('size')
export class Size extends Base {
  @Column({ name: 'ru', type: 'float' })
  ru: number;

  @Column({ name: 'eu', type: 'float' })
  eu: number;

  @Column({ name: 'uk', type: 'float' })
  uk: number;

  @Column({ name: 'us', type: 'float' })
  us: number;

  @Column({ name: 'foot_length', type: 'float' })
  footLength: number;

  @Column({ name: 'gender', type: 'enum', enum: Gender })
  gender: Gender;

  @ManyToOne(() => Brand, brand => brand.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @OneToMany(() => ProductInventory, inventory => inventory.size)
  productInventory: ProductInventory[];

  @OneToMany(
    () => ProductInShoppingCart,
    productInShoppingCart => productInShoppingCart.size,
  )
  shoppingCartProduct: ProductInShoppingCart[];
}
