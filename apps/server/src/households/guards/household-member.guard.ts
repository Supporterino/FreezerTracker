import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * Guard that verifies the authenticated user is a member of the household
 * identified by the `:hid` route parameter.
 */
@Injectable()
export class HouseholdMemberGuard implements CanActivate {
  private readonly logger = new Logger(HouseholdMemberGuard.name);

  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId: string = request.user?.userId;
    const householdId: string = request.params?.hid;

    if (!userId || !householdId) throw new ForbiddenException();

    const member = await this.prisma.householdMember.findUnique({
      where: { householdId_userId: { householdId, userId } },
    });

    if (!member) {
      this.logger.warn(`Access denied: user ${userId} is not a member of household ${householdId}`);
      throw new ForbiddenException('You are not a member of this household');
    }
    return true;
  }
}
