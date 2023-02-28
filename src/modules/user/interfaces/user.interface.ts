import { UpdateResult } from 'typeorm';
import { User } from '@/entities/user.entity';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { UpdateUserDto } from '@/modules/user/dto/update-user.dto';

export interface IUserService {
  create(dto: CreateUserDto): Promise<User>;
  save(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User | null>;
  findOneByEmail(email: string): Promise<User | null>;
  findOneById(id: number): Promise<User | null>;
  update(id: number, dto: UpdateUserDto): Promise<UpdateResult>;
}
