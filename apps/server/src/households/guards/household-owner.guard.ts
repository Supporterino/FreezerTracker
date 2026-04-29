import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HouseholdOwnerGuard implements CanActivate {
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
      throw new ForbiddenException('Only the household owner can perform this action');
    }
    return true;
  }
}
