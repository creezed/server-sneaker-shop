import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { FavoriteService } from '@/modules/user/services/favorite.service';
import { UserService } from '@/modules/user/services/user.service';
import { GetCurrentUserId } from '@/shared/decorators/get-current-user-id.decorator';

@Controller('user/favorite')
export class FavoriteController {
  constructor(
    private readonly userService: UserService,
    private readonly favoriteService: FavoriteService,
  ) {}

  @Post('add/:productId')
  async addProduct(
    @GetCurrentUserId() id: string,
    @Param('productId') productId: string,
  ) {
    const user = await this.userService.validateUser(+id, {
      favorite: true,
    });

    return this.favoriteService.addProduct(user.favorite.id, +productId);
  }

  @Delete('remove/:productId')
  async removeProduct(
    @GetCurrentUserId() id: string,
    @Param('productId') productId: string,
  ) {
    const user = await this.userService.validateUser(+id, {
      favorite: true,
    });

    return this.favoriteService.removeProduct(user.favorite.id, +productId);
  }

  @Get()
  async getFavorite(@GetCurrentUserId() id: string) {
    const user = await this.userService.validateUser(+id, {
      favorite: true,
    });

    return instanceToPlain(
      this.favoriteService.getOneById(user.favorite.id, {
        products: {
          images: true,
        },
      }),
    );
  }
}
