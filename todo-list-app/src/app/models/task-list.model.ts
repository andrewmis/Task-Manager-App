import { Task } from './task.model';

export interface TaskList {
  id: string;
  title: string;
  description: string;
  allTasksCompleted: boolean;
  allTasksDue: Date;
  tasks: Task[];
}
