import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/entities/user.entity';
import { UserRoles } from '@/shared/consts/userRoles.const';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'enum', enum: UserRoles })
  value: UserRoles;

  @ManyToMany(() => User)
  @JoinTable({ name: 'user_roles' })
  user: User[];
}
