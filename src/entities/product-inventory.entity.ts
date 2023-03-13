import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '@/entities/base';
import { Product } from '@/entities/product.entity';
import { Size } from '@/entities/size.entity';

@Entity('product_inventory')
export class ProductInventory extends Base {
  @ManyToOne(() => Product, product => product.inventory, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => Size, size => size.productInventory, { onDelete: 'CASCADE' })
  size: Size;

  @Column({ name: 'quantity' })
  quantity: number;
}
