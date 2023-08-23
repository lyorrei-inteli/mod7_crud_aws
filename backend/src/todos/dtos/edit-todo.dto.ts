import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class EditTodoDto {
  @ApiProperty()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsOptional()
  completed?: boolean;
}
