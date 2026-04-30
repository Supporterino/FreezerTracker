import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * Guard that verifies the authenticated user is the OWNER of the household
 * identified by the `:hid` route parameter.
 */
@Injectable()
export class HouseholdOwnerGuard implements CanActivate {
  private readonly logger = new Logger(HouseholdOwnerGuard.name);

  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId: string = request.user?.userId;
    const householdId: string = request.params?.hid;

    if (!userId || !householdId) throw new ForbiddenException();

    const member = await this.prisma.householdMember.findUnique({
      where: { householdId_userId: { householdId, userId } },
    });

    if (!member || member.role !== 'OWNER') {
      this.logger.warn(`Access denied: user ${userId} is not owner of household ${householdId}`);
      throw new ForbiddenException('Only the household owner can perform this action');
    }
    return true;
  }
}
