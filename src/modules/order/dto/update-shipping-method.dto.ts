import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateShippingMethodDto {
  @IsOptional()
  @IsString()
  value: string;

  @IsOptional()
  @IsNumber()
  price: number;
}
