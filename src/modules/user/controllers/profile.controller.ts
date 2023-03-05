import { Body, Controller, Get, Patch } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { UpdateProfileDto } from '@/modules/user/dto/update-profile.dto';
import { UserService } from '@/modules/user/services/user.service';
import { GetCurrentUserId } from '@/shared/decorators/get-current-user-id.decorator';

@Controller('user/profile')
export class ProfileController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getProfile(@GetCurrentUserId() id: string) {
    return instanceToPlain(this.userService.getProfile(+id));
  }
  @Patch('update')
  updateProfileCurrentUser(
    @GetCurrentUserId() id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.userService.update(+id, updateProfileDto);
  }
}
