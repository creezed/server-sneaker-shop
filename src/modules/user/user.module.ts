import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '@/entities/user.entity';
import { Services } from '@/shared/consts/services.const';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      useClass: UserService,
      provide: Services.USER,
    },
  ],
  exports: [
    {
      useClass: UserService,
      provide: Services.USER,
    },
  ],
})
export class UserModule {}
