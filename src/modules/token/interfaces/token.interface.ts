import { User } from '@/entities/user.entity';
import {
  AccessToken,
  MailVerificationToken,
  Tokens,
} from '@/modules/token/types/token.type';

export interface ITokenService {
  generateTokenPair(user: User): Promise<Tokens>;
  generateAccessToken(user: User): Promise<AccessToken>;
  generateMailVerificationToken(code: number): Promise<MailVerificationToken>;
  getPayload<T extends object>(token: string): Promise<T>;
}
