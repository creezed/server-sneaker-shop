import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateShippingMethodDto {
  @IsNotEmpty()
  @IsString()
  value: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
