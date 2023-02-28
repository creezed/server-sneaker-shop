import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@/entities/user.entity';
import { UpdateProfileDto } from '@/modules/user/dto/update-profile.dto';
import { IUserService } from '@/modules/user/interfaces/user.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: { roles: true },
    });
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: { roles: true },
    });
  }

  findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateProfileDto): Promise<UpdateResult> {
    return this.userRepository.update({ id }, updateUserDto);
  }
}
