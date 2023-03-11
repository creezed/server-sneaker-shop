import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  FindOptionsRelations,
  Repository,
  UpdateResult,
} from 'typeorm';
import { User } from '@/entities/user.entity';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { UpdateUserDto } from '@/modules/user/dto/update-user.dto';
import { RolesService } from '@/modules/user/services/roles.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
    private readonly dataSource: DataSource,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Create favorites and shopping cart done on the database side
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const baseRole = await this.rolesService.findBaseRole();
      const user = await this.userRepository.create({
        ...createUserDto,
        roles: [baseRole],
      });
      const saveUser = await this.userRepository.save(user);
      await queryRunner.commitTransaction();
      return saveUser;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Ошибка сервера');
    } finally {
      await queryRunner.release();
    }
  }

  getProfile(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: { roles: true },
    });
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: { roles: true },
    });
  }

  findOneById(
    id: number,
    relations: FindOptionsRelations<User> | undefined = undefined,
  ): Promise<User | null> {
    return this.userRepository.findOne({ where: { id }, relations });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update({ id }, updateUserDto);
  }

  async validateUser(
    id: number,
    relations: FindOptionsRelations<User> | undefined = undefined,
  ) {
    const user = await this.findOneById(id, relations);

    if (!user) {
      throw new NotFoundException('Пользователь не обнаружен');
    }

    return user;
  }
}
