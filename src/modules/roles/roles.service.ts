import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '@/entities/role.entity';
import { UserRoles } from '@/shared/consts/userRoles.const';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}
  findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  findOneById(id: number): Promise<Role | null> {
    return this.roleRepository.findOneBy({ id });
  }

  findByValue(value: UserRoles): Promise<Role | null> {
    return this.roleRepository.findOneBy({ value });
  }

  async findBaseRole(): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ value: UserRoles.USER });

    if (!role) {
      throw new NotFoundException('Базовой роли не существует');
    }

    return role;
  }
}
