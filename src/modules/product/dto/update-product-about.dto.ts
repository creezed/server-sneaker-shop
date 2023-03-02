import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProductAboutDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  shortlyDescription: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  manufacturerCountry: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  material: string;
}
