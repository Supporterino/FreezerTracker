import { ConflictException, Injectable } from '@nestjs/common';
import type { PrismaService } from '../prisma/prisma.service';
import type { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { id: true, email: true, name: true, createdAt: true },
    });
  }

  async updateMe(userId: string, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { ...(dto.name && { name: dto.name }) },
      select: { id: true, email: true, name: true, createdAt: true },
    });
  }

  async deleteMe(userId: string) {
    const ownedCount = await this.prisma.household.count({ where: { ownerId: userId } });
    if (ownedCount > 0) {
      throw new ConflictException('Transfer or delete your households first');
    }
    await this.prisma.user.delete({ where: { id: userId } });
  }
}
