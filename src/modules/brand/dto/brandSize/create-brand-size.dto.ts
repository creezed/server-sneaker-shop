import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Gender } from '@/modules/user/types/gender.type';

export class CreateBrandSizeDto {
  @IsNotEmpty()
  @IsNumber()
  ru: number;

  @IsNotEmpty()
  @IsNumber()
  eu: number;

  @IsNotEmpty()
  @IsNumber()
  uk: number;

  @IsNotEmpty()
  @IsNumber()
  us: number;

  @IsNotEmpty()
  @IsNumber()
  footLength: number;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
}
