import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

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

  async editUser(id: string, data: any) {
    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
