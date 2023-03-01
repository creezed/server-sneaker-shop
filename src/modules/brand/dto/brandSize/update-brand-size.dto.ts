import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Gender } from '@/shared/types/gender.type';

export class UpdateBrandSizeDto {
  @IsOptional()
  @IsNumber()
  ru: number;

  @IsOptional()
  @IsNumber()
  eu: number;

  @IsOptional()
  @IsNumber()
  uk: number;

  @IsOptional()
  @IsNumber()
  us: number;

  @IsOptional()
  @IsNumber()
  footLength: number;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;
}
