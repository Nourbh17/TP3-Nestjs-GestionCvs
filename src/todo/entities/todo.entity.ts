import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TodoStatusEnum } from "../enum/todo-status.enum";

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userId:number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column({ type: 'enum', enum: TodoStatusEnum,default:"En attente" })
  status:TodoStatusEnum;

}

