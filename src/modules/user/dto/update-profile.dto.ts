import {
  IsDateString,
  IsEnum,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from '@/modules/user/types/gender.type';

export class UpdateProfileDto {
  @IsOptional()
  @MinLength(4)
  @MaxLength(8)
  firstName: string;

  @IsOptional()
  @MinLength(4)
  @MaxLength(8)
  lastName: string;

  @IsOptional()
  @IsDateString()
  birthday: Date;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;
}
