import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '@/modules/user/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
