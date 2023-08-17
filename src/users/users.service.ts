import { Injectable, NotFoundException } from '@nestjs/common';
import * as crypto from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  private generateRandomHash(length: number = 6): string {
    return crypto.randomBytes(length).toString('hex');
  }

  generateReconstruireId(): string {
    const currentYear = new Date().getFullYear();
    const hash = this.generateRandomHash();
    return `${currentYear}.${hash}`;
  }

  async getUserById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
