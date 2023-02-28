import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ name: 'email', nullable: false })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ name: 'password', nullable: false })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(12)
  password: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(8)
  firstName: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(8)
  lastName: string;
}
