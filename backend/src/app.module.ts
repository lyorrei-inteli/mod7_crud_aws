import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PrismaModule,
    TodosModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
