import { Task } from './task.model';

export interface TaskList {
  id: string;
  title: string;
  description: string;
  dateCreated: string;
  allTasksCompleted: boolean;
  allTasksCompletedDate: string;
  allTasksDueDate: string;
  tasks: Task[];
}
