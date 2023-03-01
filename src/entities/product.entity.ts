import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Base } from '@/entities/base';
import { Brand } from '@/entities/brand.entity';
import { ProductAbout } from '@/entities/product-about.entity';
import { ProductImages } from '@/entities/product-images.entity';
import { Age } from '@/shared/types/age.type';
import { Gender } from '@/shared/types/gender.type';

@Entity('product')
export class Product extends Base {
  @Column({ unique: true })
  article: string;

  @Column()
  name: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'enum', enum: Age })
  age: Age;

  @ManyToOne(() => Brand, brand => brand.product)
  brand: Brand;

  @OneToMany(() => ProductImages, images => images.product)
  images: ProductImages[];

  @OneToOne(() => ProductAbout, about => about.product)
  @JoinColumn()
  about: ProductAbout;
}
