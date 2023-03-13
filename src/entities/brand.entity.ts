import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '@/entities/base';
import { Product } from '@/entities/product.entity';
import { Size } from '@/entities/size.entity';

@Entity('brand')
export class Brand extends Base {
  @Column({ name: 'value' })
  value: string;

  @OneToMany(() => Size, size => size.brand)
  sizes: Size[];

  @OneToMany(() => Product, product => product.brand)
  product: Product[];
}
