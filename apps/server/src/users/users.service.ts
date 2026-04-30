import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { UpdateUserDto } from './dto/update-user.dto';

/**
 * Service handling user profile operations (read, update, delete).
 * All operations are scoped to the authenticated user.
 */
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  /** Retrieve the authenticated user's profile. */
  async getMe(userId: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { id: true, email: true, name: true, createdAt: true },
    });
  }

  /** Update the authenticated user's name. */
  async updateMe(userId: string, dto: UpdateUserDto) {
    this.logger.log(`User ${userId} updating profile`);
    return this.prisma.user.update({
      where: { id: userId },
      data: { ...(dto.name && { name: dto.name }) },
      select: { id: true, email: true, name: true, createdAt: true },
    });
  }

  /**
   * Delete the authenticated user's account.
   * @throws ConflictException if the user still owns households.
   */
  async deleteMe(userId: string) {
    const ownedCount = await this.prisma.household.count({ where: { ownerId: userId } });
    if (ownedCount > 0) {
      this.logger.warn(
        `User ${userId} attempted to delete account while owning ${ownedCount} household(s)`,
      );
      throw new ConflictException('Transfer or delete your households first');
    }
    await this.prisma.user.delete({ where: { id: userId } });
    this.logger.log(`User ${userId} deleted their account`);
  }
}
