import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { TodosService } from './todos.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { EditTodoDto } from './dtos/edit-todo.dto';

@ApiTags('Todos')
@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async findAll(@Request() req) {
    return await this.todosService.findAll(req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async login(@Request() req, @Body() createTodoDto: CreateTodoDto) {
    const newTodo = {
      ...createTodoDto,
      completed: false,
      userId: req.user.id,
    };
    return await this.todosService.create(newTodo);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  async update(@Request() req, @Body() editTodoDto: EditTodoDto) {
    const { id } = req.params;
    const { userId } = req.user;
    const updatedTodo = {
      ...editTodoDto,
      userId,
    };
    return await this.todosService.update(id, userId, updatedTodo);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async delete(@Request() req) {
    const { id } = req.params;
    return await this.todosService.delete(id, req.user.id);
  }
}
