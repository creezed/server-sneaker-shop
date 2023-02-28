import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadAccess } from '@/modules/token/types/jwt-payload.type';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayloadAccess;
    return user.id;
  },
);
