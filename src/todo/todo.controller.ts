import { Body, Controller, Delete, Param, Post, Put, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todo')
export class TodoController {
constructor(private readonly todoService: TodoService) {}

@Post()
async create(@Req() req, @Body() todoDto: CreateTodoDto) {
  const userId = req['userId']; 
  return this.todoService.create(todoDto, userId);
}

@Put(':id')
async update(@Req() req, @Param('id') id, @Body() todoDto: UpdateTodoDto) {
  const userId = req['userId']; 
  return this.todoService.update(id, todoDto, userId);
}

@Delete(':id')
async delete(@Req() req, @Param('id') id) {
  const userId = req['userId'];
  return this.todoService.delete(id, userId);
}
}