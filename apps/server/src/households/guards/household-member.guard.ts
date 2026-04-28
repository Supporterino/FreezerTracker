import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HouseholdMemberGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId: string = request.user?.userId;
    const householdId: string = request.params?.hid;

    if (!userId || !householdId) throw new ForbiddenException();

    const member = await this.prisma.householdMember.findUnique({
      where: { householdId_userId: { householdId, userId } },
    });

    if (!member) throw new ForbiddenException('You are not a member of this household');
    return true;
  }
}
