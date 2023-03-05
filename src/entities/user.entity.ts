import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { Base } from '@/entities/base';
import { Favorite } from '@/entities/favorite.entity';
import { Role } from '@/entities/role.entity';
import { ShoppingCart } from '@/entities/shopping-cart.entity';
import { Gender } from '@/shared/types/gender.type';

@Entity('user')
export class User extends Base {
  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true, type: 'enum', enum: Gender })
  gender?: Gender;

  @Column({ nullable: true, type: 'date' })
  birthday?: Date;

  @Column()
  @Exclude()
  password: string;

  @OneToOne(() => ShoppingCart, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'shopping_cart_id' })
  shoppingCart: ShoppingCart;

  @OneToOne(() => Favorite, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'favorite_id' })
  favorite: Favorite;

  @ManyToMany(() => Role, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinTable({ name: 'user_roles' })
  roles: Role[];
}
