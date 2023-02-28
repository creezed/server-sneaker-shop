import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ name: 'email', nullable: false })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ name: 'password', nullable: false })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(12)
  password: string;

  @ApiProperty({ name: 'remember', nullable: false })
  @IsNotEmpty()
  @IsBoolean()
  remember: boolean;
}
