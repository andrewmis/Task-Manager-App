import { Time } from '@angular/common';
import { TaskPriority } from '../enumerations/task-priority';

export interface Task {
  parentListId: string;
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  isComplete: boolean;
  dateAdded: Date;
  dateDue: Date;
  dateCompleted: Date;
  timeCompleted: Time;
}
