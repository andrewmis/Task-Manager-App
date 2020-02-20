import { Task } from './task.model';

export interface TaskList {
  /**
   * A UUID that gets set on list creation.
   */
  id: string;
  /**
   * A string that will be used as the name of the list.
   */
  title: string;
  /**
   * A detailed description of the list.
   */
  description: string;
  /**
   * Denotes if all of the list's tasks have been completed.
   */
  allTasksCompleted: boolean;
  /**
   * The date of which the last task was completed, making the list complete.
   */
  allTasksCompletedDate: string;
  /**
   * The date that the tasks should be completed by.
   */
  allTasksDueDate: string;
  /**
   * The list's collection of tasks.
   */
  tasks: Task[];
}
