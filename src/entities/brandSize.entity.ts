import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from '@/entities/base';
import { Brand } from '@/entities/brand.entity';
import { Gender } from '@/modules/user/types/gender.type';

@Entity('brand_size')
export class BrandSize extends Base {
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

  @ManyToOne(() => Brand, brand => brand.id)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;
}
