import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProductInventoryDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
