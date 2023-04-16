import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import {Repository} from "typeorm"
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
      ) {}
      async create(newTodo:CreateTodoDto, userId: number): Promise<Todo> {
        const todo = new Todo();
        todo.name = newTodo.name;
        todo.description = newTodo.description;
        todo.userId = userId; 
        return this.todoRepository.save(todo);
      }
      async update(id:number,todo:UpdateTodoDto, userId:number): Promise<Todo>{
        const todoToUpdate = await this.todoRepository.findOne({where:{id}});
        if (todoToUpdate && todoToUpdate.userId === userId) {
            todoToUpdate.name=todo.name?todo.name:todoToUpdate.name;
            todoToUpdate.description = todo.description?todo.description:todoToUpdate.description;
            todoToUpdate.status = todo.status?todo.status:todoToUpdate.status;
            return this.todoRepository.save(todoToUpdate);
          } else {
            throw new UnauthorizedException('Accès non autorisé');
          }
      }
      async delete(id:number,userId:number): Promise<void>{
        const todo = await this.todoRepository.findOne({where:{id}});
        if (todo && todo.userId === userId) {
           await this.todoRepository.delete(id);
        } else {
          throw new UnauthorizedException('Accès non autorisé');
        }
      }

      }