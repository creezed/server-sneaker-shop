import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '@/entities/base';
import { BrandSize } from '@/entities/brand-size.entity';
import { Product } from '@/entities/product.entity';

@Entity('brand')
export class Brand extends Base {
  @Column({ name: 'value' })
  value: string;

  @OneToMany(() => BrandSize, size => size.brand)
  sizes: BrandSize[];

  @OneToMany(() => Product, product => product.brand)
  product: Product[];
}
