import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '@/entities/base';
import { Product } from '@/entities/product.entity';

@Entity('product_images')
export class ProductImages extends Base {
  @Column()
  small: string;

  @Column()
  medium: string;
  @Column()
  large: string;
  @Column({ name: 'extra_large' })
  extraLarge: string;

  @ManyToOne(() => Product, product => product.images, { onDelete: 'CASCADE' })
  @Exclude()
  product: Product;
}
