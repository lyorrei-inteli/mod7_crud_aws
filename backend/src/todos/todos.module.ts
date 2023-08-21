import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [TodosService, TodosService],
  controllers: [TodosController],
  imports: [PrismaModule, AuthModule],
})
export class TodosModule {}
