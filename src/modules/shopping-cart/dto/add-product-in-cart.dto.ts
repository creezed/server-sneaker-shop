import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddProductInCartDto {
  @IsNotEmpty()
  @IsNumber()
  size: number;
}
