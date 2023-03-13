import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Base } from '@/entities/base';
import { Product } from '@/entities/product.entity';
import { Promotion } from '@/entities/promotion.entity';

@Entity('product_promotion')
export class ProductInPromotion extends Base {
  @Exclude()
  id: number;

  @ManyToOne(() => Promotion, promotion => promotion.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'promotion_id' })
  promotion: Promotion;

  @OneToOne(() => Product, product => product.promotion, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  discount: number;
}
