import { Response } from 'express';
import { LoginUserDto } from '../dto/login-user.dto';
import { RegistrationUserDto } from '../dto/registration-user.dto';
import { User } from '@/entities/user.entity';
import { Tokens } from '@/modules/token/types/token.type';

export interface IAuthService {
  login(dto: LoginUserDto, res: Response): Promise<User>;
  registration(dto: RegistrationUserDto): Promise<User>;
  logout(res: Response): void;
  refreshTokens(refreshToken: string, userId: number): Promise<Tokens>;
  validateUser(dto: LoginUserDto): Promise<User>;
  validateGuest(dto: RegistrationUserDto): Promise<boolean>;
}
