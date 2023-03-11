import { IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  postcode: string;
  @IsOptional()
  @IsString()
  city: string;
  @IsOptional()
  @IsString()
  address_line: string;
  @IsOptional()
  @IsString()
  zone_name: string;
}
