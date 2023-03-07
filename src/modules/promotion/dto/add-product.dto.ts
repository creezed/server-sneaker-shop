import { IsNumber, IsOptional, Max } from 'class-validator';

export class AddProductDto {
  @IsOptional()
  @IsNumber()
  @Max(99)
  discount: number;
}
