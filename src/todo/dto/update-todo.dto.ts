import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { TodoStatusEnum } from '../enum/todo-status.enum';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    name:string;  
    description:string;
    status:TodoStatusEnum;
}
