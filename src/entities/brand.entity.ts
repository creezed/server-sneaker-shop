import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '@/entities/base';
import { BrandSize } from '@/entities/brandSize.entity';

@Entity('brand')
export class Brand extends Base {
  @Column({ name: 'value' })
  value: string;

  @OneToMany(() => BrandSize, size => size.brand)
  sizes: BrandSize[];
}
