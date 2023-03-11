import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '@/entities/base';
import { BrandSize } from '@/entities/brand-size.entity';
import { Product } from '@/entities/product.entity';

@Entity('product_inventory')
export class ProductInventory extends Base {
  @ManyToOne(() => Product, product => product.inventory)
  product: Product;

  @ManyToOne(() => BrandSize, size => size.productInventory)
  size: BrandSize;

  @Column({ name: 'quantity' })
  quantity: number;
}
