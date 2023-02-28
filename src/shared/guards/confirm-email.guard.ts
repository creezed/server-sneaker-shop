import { AuthGuard } from '@nestjs/passport';
import { Jwt } from '@/shared/consts/jwt.const';

export class ConfirmEmailGuard extends AuthGuard(Jwt.CONFIRM_EMAIL) {}
