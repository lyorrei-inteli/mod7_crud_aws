import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prismaService: PrismaService) {}
  async findAll(userId) {
    return this.prismaService.todo.findMany({ where: { userId } });
  }

  async create(data) {
    return this.prismaService.todo.create({ data });
  }

  async update(id, userId, data) {
    return this.prismaService.todo.update({ where: { id, userId }, data });
  }

  async delete(id, userId) {
    return this.prismaService.todo.delete({ where: { id, userId } });
  }
}
