import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { ShoppingCartService } from '@/modules/user/services/shopping-cart.service';
import { UserService } from '@/modules/user/services/user.service';
import { GetCurrentUserId } from '@/shared/decorators/get-current-user-id.decorator';

@Controller('user/shopping-cart')
export class ShoppingCartController {
  constructor(
    private readonly userService: UserService,
    private readonly shoppingCartService: ShoppingCartService,
  ) {}

  @Post('add/:productId')
  async addProductInCart(
    @GetCurrentUserId() id: string,
    @Param('productId') productId: string,
  ) {
    const user = await this.userService.validateUser(+id, {
      shoppingCart: true,
    });

    return this.shoppingCartService.addProduct(
      user.shoppingCart.id,
      +productId,
    );
  }

  @Delete('remove/:productId')
  async removeProductInCart(
    @GetCurrentUserId() id: string,
    @Param('productId') productId: string,
  ) {
    const user = await this.userService.validateUser(+id, {
      shoppingCart: true,
    });

    return this.shoppingCartService.removeProduct(
      user.shoppingCart.id,
      +productId,
    );
  }

  @Get()
  async getShoppingCart(@GetCurrentUserId() id: string) {
    const user = await this.userService.validateUser(+id, {
      shoppingCart: true,
    });

    return instanceToPlain(
      this.shoppingCartService.getOneById(user.shoppingCart.id, {
        products: {
          images: true,
        },
      }),
    );
  }
}
