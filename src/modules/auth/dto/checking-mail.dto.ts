import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CheckingMailDto {
  @ApiProperty({ name: 'email', nullable: false })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ name: 'firstName', nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(8)
  firstName: string;

  @ApiProperty({ name: 'lastName', nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(8)
  lastName: string;
}
