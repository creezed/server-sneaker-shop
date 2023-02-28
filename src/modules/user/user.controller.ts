import { Body, Controller, Get, Inject, Param, Patch } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateProfileDto } from '@/modules/user/dto/update-profile.dto';
import { IUserService } from '@/modules/user/interfaces/user.interface';
import { Routes } from '@/shared/consts/routes.const';
import { Services } from '@/shared/consts/services.const';
import { GetCurrentUserId } from '@/shared/decorators/get-current-user-id.decorator';

@Controller(Routes.USER)
export class UserController {
  constructor(@Inject(Services.USER) private userService: IUserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Get('profile')
  findProfileCurrentUser(@GetCurrentUserId() id: number) {
    return instanceToPlain(this.userService.findOne(id));
  }

  @Patch('profile/update')
  updateProfileCurrentUser(
    @GetCurrentUserId() id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.userService.update(+id, updateProfileDto);
  }
}
