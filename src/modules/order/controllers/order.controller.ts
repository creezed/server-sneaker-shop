import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '@/modules/order/dto/create-order.dto';
import { UserService } from '@/modules/user/services/user.service';
import { GetCurrentUserId } from '@/shared/decorators/get-current-user-id.decorator';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getAll() {
    return this.orderService.getAll();
  }

  @Get('me')
  getAllByCurrentUser(@GetCurrentUserId() userId: number) {
    return this.orderService.getAllByUserId(userId);
  }

  @Post()
  async create(
    @GetCurrentUserId() userId: number,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const user = await this.userService.validateUser(userId, {
      shoppingCart: true,
      addresses: true,
    });
    return this.orderService.create(user, createOrderDto);
  }
}
