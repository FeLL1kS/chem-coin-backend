import { Injectable } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  private tasks: TaskDto[] = [
    {
      id: '1',
      title: 'First Task Title',
      description: 'First Task Description',
      price: 2,
      isAssigned: true,
      performer: {
        name: 'Cool',
        surname: 'Guy',
        paspnumber: '111111',
        studnumber: '1111111',
        email: '111',
        password: '111',
      },
    },
    {
      id: '2',
      title: 'Second Task Title',
      description: 'Second Task Description',
      price: 1,
      isAssigned: false,
      performer: null,
    },
  ];

  public getAllTasks(): TaskDto[] {
    return this.tasks;
  }

  public getTaskById(id: string): TaskDto {
    const task: TaskDto = this.tasks.find((t) => t.id === id);

    return task;
  }
}
