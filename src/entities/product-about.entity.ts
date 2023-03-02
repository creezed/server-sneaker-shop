import { Column, Entity, OneToOne } from 'typeorm';
import { Base } from '@/entities/base';
import { Product } from '@/entities/product.entity';

@Entity('product_about')
export class ProductAbout extends Base {
  @Column({ name: 'shortly_description', type: 'text' })
  shortlyDescription: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'manufacturer_country' })
  manufacturerCountry: string;

  @Column({ name: 'material' })
  material: string;

  @OneToOne(() => Product, product => product.about, { onDelete: 'CASCADE' })
  product: Product;
}
