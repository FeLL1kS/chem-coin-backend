import { Inject, Injectable } from '@nestjs/common';
import { Providers } from 'src/core/constants';
import { TaskDto } from './dto/task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @Inject(Providers.TASK_REPOSITORY)
    private taskRepository: typeof Task,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.findAll<Task>();
  }

  async getTaskById(id: string): Promise<Task> {
    return await this.taskRepository.findOne<Task>({ where: { id } });
  }

  async create(task: TaskDto): Promise<Task> {
    return await this.taskRepository.create<Task>(task);
  }

  async assignUser(taskId: string, userId: string) {
    return await this.taskRepository.update(
      { assignedUserId: userId },
      { where: { id: taskId } },
    );
  }
}
