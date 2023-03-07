import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '@/entities/base';
import { ProductInPromotion } from '@/entities/product-in-promotion.entity';

@Entity('promotion')
export class Promotion extends Base {
  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'start_date', type: 'timestamptz' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamptz' })
  endDate: Date;

  @OneToMany(
    () => ProductInPromotion,
    productInPromotion => productInPromotion.promotion,
  )
  products: ProductInPromotion[];
}
