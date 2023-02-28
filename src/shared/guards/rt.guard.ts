import { AuthGuard } from '@nestjs/passport';
import { Jwt } from '@/shared/consts/jwt.const';

export class RtGuard extends AuthGuard(Jwt.REFRESH) {}
