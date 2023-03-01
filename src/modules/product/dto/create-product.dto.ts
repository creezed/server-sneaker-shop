import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Age } from '@/shared/types/age.type';
import { Gender } from '@/shared/types/gender.type';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  shortlyDescription: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  manufacturerCountry: string;
  @IsNotEmpty()
  @IsString()
  material: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsEnum(Age)
  age: Age;

  @IsNotEmpty()
  @IsNumber()
  brandId: number;
}
