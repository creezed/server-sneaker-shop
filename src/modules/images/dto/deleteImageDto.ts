import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteImageDto {
  @IsNotEmpty()
  @IsString()
  path: string;
}
