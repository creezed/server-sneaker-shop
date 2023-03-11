import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  address: number;
  @IsNotEmpty()
  @IsNumber()
  paymentMethod: number;
  @IsNotEmpty()
  @IsNumber()
  shippingMethod: number;

  @IsOptional()
  @IsString()
  orderComment: string;
}
