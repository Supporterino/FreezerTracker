import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

/**
 * Typed representation of the authenticated user extracted from a JWT.
 * Populated by the JwtStrategy's `validate()` method.
 */
export interface AuthenticatedUser {
  userId: string;
  email: string;
}

/**
 * Parameter decorator that extracts the authenticated user from the request.
 *
 * Usage:
 * ```ts
 * @Get('me')
 * getMe(@CurrentUser() user: AuthenticatedUser) {
 *   return this.usersService.getMe(user.userId);
 * }
 * ```
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as AuthenticatedUser;
  },
);
