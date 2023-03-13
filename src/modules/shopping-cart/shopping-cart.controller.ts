import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { AddProductInCartDto } from '@/modules/shopping-cart/dto/add-product-in-cart.dto';
import { ShoppingCartService } from '@/modules/shopping-cart/shopping-cart.service';
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
    @GetCurrentUserId() userId: string,
    @Param('productId') productId: string,
    @Body() addProductInCartDto: AddProductInCartDto,
  ) {
    const {
      shoppingCart: { id },
    } = await this.userService.validateUser(+userId, {
      shoppingCart: true,
    });

    return this.shoppingCartService.addProduct(
      id,
      +productId,
      addProductInCartDto.size,
    );
  }

  @Delete('remove/:productId')
  async removeProductInCart(
    @GetCurrentUserId() userId: string,
    @Param('productId') productId: string,
  ) {
    const {
      shoppingCart: { id },
    } = await this.userService.validateUser(+userId, {
      shoppingCart: true,
    });

    return this.shoppingCartService.removeProduct(id, +productId);
  }

  @Get()
  async getShoppingCart(@GetCurrentUserId() userId: string) {
    return instanceToPlain(
      this.shoppingCartService.getOneWithPriceByUserId(+userId),
    );
  }
}
