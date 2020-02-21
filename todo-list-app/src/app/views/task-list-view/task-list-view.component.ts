import { Component, OnDestroy } from '@angular/core';
import { TaskList } from 'src/app/models/task-list.model';
import { Task } from 'src/app/models/task.model';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskPriority } from 'src/app/enumerations/task-priority';
import { ListManagerService } from 'src/app/services/list-manager.service';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { GetTodaysDate } from 'src/app/shared/utilities';

@Component({
    selector: 'task-list-view',
    templateUrl: 'task-list-view.component.html',
    styleUrls: ['task-list-view.component.scss']
})
export class TaskListViewComponent implements OnDestroy {

  public isEditing = false;
  public isReordering = false;

  // Waiting on filter options renable
  // public isFilteringByComplete = false;
  // public isFilteringByIncomplete = false;

  public quickAddFormGroup: FormGroup;

  constructor(private _listManager: ListManagerService,
              private _taskManager: TaskManagerService) {
    this.quickAddFormGroup = new FormGroup({
      name: new FormControl()
    });
  }

  ngOnDestroy() {
    // Clear any unsaved task states pertaining to list
    this._taskManager.cancelCreateTask();
    this._taskManager.cancelEditingTask();
  }

  /**
   * The data for the current list being viewed.
   */
  public get listData(): TaskList {
    return this._listManager.listBeingViewed;
  }

  /**
   * The list's title property.
   */
  public get title(): string {
    return this.listData.title;
  }

  /**
   * The list's description property.
   */
  public get description(): string {
    return this.listData.description;
  }

  /**
   * The list's tasks collection.
   */
  public get tasks(): Task[] {
    return this.listData.tasks;
  }

  /**
   * The list's due date for all tasks to be complete.
   */
  public get allTasksDueDate(): string {
    return this.listData.allTasksDueDate;
  }

  /**
   * Gets the appropriate icon name based on the reorder state.
   */
  public get reorderIcon(): string {
    return this.isReordering ? 'check' : 'reorder';
  }

  /**
   * Gets the appropriate tooltip based on the reorder state.
   */
  public get reorderTooltip(): string {
    return this.isReordering ? 'Finish reordering tasks' : 'Reorder tasks';
  }

  /**
   * Gets the appropriate icon name based on the edit state.
   */
  public get editIcon(): string {
    return this.isEditing ? 'check' : 'edit';
  }

  /**
   * Gets the appropriate tooltip based on the edit state.
   */
  public get editTooltip(): string {
    return this.isEditing ? 'Finish editing tasks' : 'Edit tasks';
  }

  /**
   * Check if this list has multiple tasks.
   */
  public get hasMultipleTasks(): boolean {
    return this.tasks.length > 1;
  }

  /**
   * Check if this list has at least one task.
   */
  public get hasTasks(): boolean {
    return this.tasks.length > 0;
  }

  /**
   * Check if this list has at least one task and is being filtered.
   */
  public get shouldShowNoTasks(): boolean {
    return !this.hasTasks; // && !this.isFiltering;
  }

  /**
   * Toggles a task between complete/incomplete.
   * @param event The event emitted when toggling a task.
   */
  public toggleTask(event) {
    // Get the event data
    const taskId = event.option.value;
    const newIsComplete = event.option.selected;

    // Find the task with the corresponding id
    const taskToUpdate = this.tasks.find(task => task.id === taskId);
    taskToUpdate.isComplete = newIsComplete;

    // If completing, update the completion date
    if (newIsComplete) {
      taskToUpdate.dateCompleted = GetTodaysDate();
    }

    // Update the list's completion status
    this._listManager.checkIfListIsComplete();
  }

  /**
   * Update the list's task order on reordering a task.
   * @param event The emitted reorder event.
   */
  public onReorderTask(event) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  /**
   * Toggles the list's edit state.
   */
  public onToggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  /**
   * Puts the list into an editing state.
   */
  public onEditList(): void {
    this._listManager.beginEditingList(this.listData);
  }

  /**
   * Puts the task into an edit state.
   * @param task The task to begin editing.
   */
  public onEditTask(task: Task): void {
    this._taskManager.beginEditingTask(task);
  }

  /**
   * Prompts the user before deleting the given task.
   * @param taskId The task to delete.
   */
  public onDeleteTask(taskId: string): void {
    // Confirm
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    // Remove task
    this._taskManager.deleteTask(taskId);

    // Check if should stop editing
    if (!this.hasTasks) {
      this.onToggleEdit();
    }
  }

  /**
   * On using the quick add, validate the input task name and create a task.
   */
  public onQuickAddTask(): void {
    const taskName = this.quickAddFormGroup.controls.name.value;

    if (taskName && !this._listManager.doesTaskNameExistOnListBeingViewed(taskName)) {
      // Create new task with name
      this._taskManager.quickCreateTask(taskName);
      // Clear form
      this.quickAddFormGroup.reset();
      this.quickAddFormGroup.markAsPristine();
      this.quickAddFormGroup.markAsUntouched();
    }
  }

  /**
   * On choosing to advance create, begin creating a task.
   * @param event The event emitted when the form is submitted.
   */
  public onDetailedAddTask(event): void {
    event.preventDefault();

    this._taskManager.beginCreateTask();
  }

  /**
   * Toggle the ability to reorder lists.
   */
  public onToggleReorder(): void {
    this.isReordering = !this.isReordering;
  }

  /**
   * Exit this list's viewing state and return to the All Lists page.
   */
  public onStopViewingList(): void {
    this._listManager.stopViewingList();
  }

  /**
   * Returns an icn name based on the given priority.
   * @param priority The priority to get the icon of.
   */
  public getTaskPriorityIcon(priority: TaskPriority): string {
    switch (priority) {
      case TaskPriority.High:
        return 'arrow_upward';

      case TaskPriority.Medium:
        return 'remove';

      case TaskPriority.Low:
        return 'arrow_downward';

      default:
        break;
    }
  }

  /**
   * Returns a color based on the given priority.
   * @param priority The priority to get the color of.
   */
  public getTaskPriorityColor(priority: TaskPriority): string {
    switch (priority) {
      case TaskPriority.High:
        return 'red';

      case TaskPriority.Medium:
        return 'orange';

      case TaskPriority.Low:
        return 'green';

      default:
        break;
    }
  }

  // private get isFiltering(): boolean {
  //   return this.isFilteringByComplete || this.isFilteringByIncomplete;
  // }

  // TODO: Enable filtering.
  // public onToggleFilter(event): void {
  //   if (event.source.value === 'complete') {
  //     this.isFilteringByComplete = event.checked;
  //     if (this.isFilteringByComplete && this.isFilteringByIncomplete) {
  //       this.isFilteringByIncomplete = false;
  //     }
  //   } else {
  //     this.isFilteringByIncomplete = event.checked;
  //     if (this.isFilteringByComplete && this.isFilteringByIncomplete) {
  //       this.isFilteringByComplete = false;
  //     }
  //   }
  //   this.filterTasks();
  // }

  // private filterTasks(): void {
  //   if (this.isFilteringByComplete) {
  //     this._tasks = this.listData.tasks.filter(task => task.isComplete);
  //   } else if (this.isFilteringByIncomplete) {
  //     this._tasks = this.listData.tasks.filter(task => !task.isComplete);
  //   } else {
  //     this._tasks = this.listData.tasks;
  //   }
  // }
}
