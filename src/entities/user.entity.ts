import { Exclude } from 'class-transformer';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Base } from '@/entities/base';
import { Role } from '@/entities/role.entity';
import { Gender } from '@/modules/user/types/gender.type';

@Entity('user')
export class User extends Base {
  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true, type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ nullable: true, type: 'date' })
  birthday: Date;

  @Column()
  @Exclude()
  password: string;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];
}
