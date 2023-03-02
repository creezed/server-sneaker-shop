import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UpdateProductAboutDto } from '@/modules/product/dto/update-product-about.dto';
import { Age } from '@/shared/types/age.type';
import { Gender } from '@/shared/types/gender.type';

export class UpdateProductDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Age)
  age: Age;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  brand: number;

  @IsOptional()
  about: UpdateProductAboutDto;
}
