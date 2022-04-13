import { Providers } from 'src/core/constants';
import { Task } from './task.entity';

export const taskProviders = [
  {
    provide: Providers.TASK_REPOSITORY,
    useValue: Task,
  },
];
