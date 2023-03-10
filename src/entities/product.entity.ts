import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Base } from '@/entities/base';
import { Brand } from '@/entities/brand.entity';
import { Order } from '@/entities/order.entity';
import { ProductAbout } from '@/entities/product-about.entity';
import { ProductImages } from '@/entities/product-images.entity';
import { ProductInPromotion } from '@/entities/product-in-promotion.entity';
import { ProductInShoppingCart } from '@/entities/product-in-shopping-cart.entity';
import { ProductInventory } from '@/entities/product-inventory.entity';
import { Age } from '@/shared/types/age.type';
import { Gender } from '@/shared/types/gender.type';

@Entity('product')
export class Product extends Base {
  @Column()
  name: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'enum', enum: Age })
  age: Age;

  @ManyToOne(() => Brand, brand => brand.product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @OneToMany(() => ProductImages, images => images.product)
  images: ProductImages[];

  @OneToOne(() => ProductAbout, about => about.product, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'about_id' })
  about: ProductAbout;

  @OneToOne(
    () => ProductInPromotion,
    productInPromotion => productInPromotion.product,
  )
  promotion?: ProductInPromotion;

  @OneToMany(() => ProductInventory, inventory => inventory.product)
  inventory: ProductInventory[];

  @ManyToMany(() => Order, order => order.products)
  orders: Order[];

  @OneToMany(
    () => ProductInShoppingCart,
    productInShoppingCart => productInShoppingCart.product,
  )
  productInShoppingCart: ProductInShoppingCart[];
}
