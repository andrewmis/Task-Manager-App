import { TaskPriority } from '../enumerations/task-priority';

export interface Task {
  /**
   * The id of the list that the task belongs to.
   */
  parentListId: string;
  /**
   * A UUID that gets set on list creation.
   */
  id: string;
  /**
   * A string that will be used as the name of the task.
   */
  title: string;
  /**
   * A detailed description of the task.
   */
  description: string;
  /**
   * Denotes a task's level of urgency.
   */
  priority: TaskPriority;
  /**
   * Denotes if the task has been completed.
   */
  isComplete: boolean;
  /**
   * The date that the task should be completed by.
   */
  dateDue: string;
  /**
   * The date that the task was completed on.
   */
  dateCompleted: string;
}
