import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ConfirmMailDto {
  @ApiProperty({ name: 'email', nullable: false })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ name: 'code', nullable: false })
  @IsNotEmpty()
  @IsNumber()
  code: number;
}
