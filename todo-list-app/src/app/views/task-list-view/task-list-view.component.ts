import { Component, Input, OnInit } from '@angular/core';
import { TaskList } from 'src/app/models/task-list.model';
import { Task } from 'src/app/models/task.model';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskPriority } from 'src/app/enumerations/task-priority';
import { ListManagerService } from 'src/app/services/list-manager.service';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { GetTodaysDate, GetCurrentTime } from 'src/app/shared/utilities';

@Component({
    selector: 'task-list-view',
    templateUrl: 'task-list-view.component.html',
    styleUrls: ['task-list-view.component.scss']
})
export class TaskListViewComponent implements OnInit {
  public listData: TaskList;

  public title: string;
  public description: string;
  public tasks: Task[];

  public isEditing = false;
  public isReordering = false;
  public isFilteringByComplete = false;
  public isFilteringByIncomplete = false;
  public quickAddFormGroup: FormGroup;

  private listDataCopy: any = {};

  constructor(private _listManager: ListManagerService,
              private _taskManager: TaskManagerService) {
    this.listData = this._listManager.listBeingViewed;
    this.quickAddFormGroup = new FormGroup({
      name: new FormControl()
    });
  }

  ngOnInit() {
    Object.assign(this.listDataCopy, this.listData);

    this.title = this.listDataCopy.title;
    this.description = this.listDataCopy.description;
    this.tasks = this.listDataCopy.tasks;
  }

  public toggleTask(event) {
    const taskId = event.option.value;
    const newIsComplete = event.option.selected;

    const taskToUpdate = this.tasks.find(task => task.id === taskId);
    taskToUpdate.isComplete = newIsComplete;

    if (newIsComplete) {
      taskToUpdate.dateCompleted = GetTodaysDate();
    }
    this.checkIfListIsComplete();
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
    if (confirm('Are you sure you want to delete this task?')) {
      // Delete task
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
  }

  public onQuickAddTask(): void {
    const taskName = this.quickAddFormGroup.controls.name.value;
    if (this.quickAddFormGroup.valid && !this._listManager.doesTaskNameExistOnListBeingViewed(taskName)) {
      // Create new task with name
      this._taskManager.quickCreateTask(taskName);
      // Clear form
      this.quickAddFormGroup.reset();
    }
  }

  public onDetailedAddTask(event): void {
    event.preventDefault();

    this._taskManager.beginCreateTask();
  }

  public onToggleFilter(event): void {
    if (event.source.value === 'complete') {
      this.isFilteringByComplete = event.checked;
      if (this.isFilteringByComplete && this.isFilteringByIncomplete) {
        this.isFilteringByIncomplete = false;
      }
    } else {
      this.isFilteringByIncomplete = event.checked;
      if (this.isFilteringByComplete && this.isFilteringByIncomplete) {
        this.isFilteringByComplete = false;
      }
    }
    this.filterTasks();
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

  public getTotalCount(): number {
    return this.listData.tasks.length;
  }

  public getCompletedCount(): number {
    return this.listData.tasks.filter(task => task.isComplete).length;
  }

  private filterTasks(): void {
    if (this.isFilteringByComplete) {
      this.tasks = this.listDataCopy.tasks.filter(task => task.isComplete);
    } else if (this.isFilteringByIncomplete) {
      this.tasks = this.listDataCopy.tasks.filter(task => !task.isComplete);
    } else {
      this.tasks = this.listDataCopy.tasks;
    }
  }

  private checkIfListIsComplete(): void {
    const incompleteTasks = this.tasks.filter(task => !task.isComplete);

    if (incompleteTasks.length < 1) {
      this.listData.allTasksCompleted = true;
      this.listData.allTasksCompletedDate = GetTodaysDate();
    } else {
      this.listData.allTasksCompleted = false;
      this.listData.allTasksCompletedDate = undefined;
    }
  }
}
