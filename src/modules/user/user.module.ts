import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { Role } from '@/entities/role.entity';
import { User } from '@/entities/user.entity';
import { ProfileController } from '@/modules/user/controllers/profile.controller';
import { RolesService } from '@/modules/user/services/roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UserController, ProfileController],
  providers: [UserService, RolesService],
  exports: [UserService],
})
export class UserModule {}
