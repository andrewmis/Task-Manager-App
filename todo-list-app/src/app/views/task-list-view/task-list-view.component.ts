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

  public get listData(): TaskList {
    return this._listManager.listBeingViewed;
  }
  public get title(): string {
    return this.listData.title;
  }
  public get description(): string {
    return this.listData.description;
  }
  public get tasks(): Task[] {
    return this.listData.tasks;
  }

  public get allTasksDueDate(): string {
    return this.listData.allTasksDueDate;
  }

  public toggleTask(event) {
    const taskId = event.option.value;
    const newIsComplete = event.option.selected;

    const taskToUpdate = this.tasks.find(task => task.id === taskId);
    taskToUpdate.isComplete = newIsComplete;

    if (newIsComplete) {
      taskToUpdate.dateCompleted = GetTodaysDate();
    }
    this._listManager.checkIfListIsComplete();
  }

  public onReorderTask(event) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  public onToggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  public onEditList(): void {
    this._listManager.beginEditingList(this.listData);
  }

  public onEditTask(task: Task): void {
    this._taskManager.beginEditingTask(task);
  }

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

  public onDetailedAddTask(event): void {
    event.preventDefault();

    this._taskManager.beginCreateTask();
  }

  public onToggleReorder(): void {
    this.isReordering = !this.isReordering;
  }

  public onStopViewingList(): void {
    this._listManager.stopViewingList();
  }

  public get reorderIcon(): string {
    return this.isReordering ? 'check' : 'reorder';
  }

  public get reorderTooltip(): string {
    return this.isReordering ? 'Finish reordering tasks' : 'Reorder tasks';
  }

  public get editIcon(): string {
    return this.isEditing ? 'check' : 'edit';
  }

  public get editTooltip(): string {
    return this.isEditing ? 'Finish editing tasks' : 'Edit tasks';
  }

  public get hasMultipleTasks(): boolean {
    return this.tasks.length > 1;
  }

  public get hasTasks(): boolean {
    return this.tasks.length > 0;
  }

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

  public shouldShowNoTasks(): boolean {
    return !this.hasTasks; // && !this.isFiltering;
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
