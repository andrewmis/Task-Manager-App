import { Component, Input, OnInit } from '@angular/core';
import { TaskList } from 'src/app/models/task-list.model';
import { Task } from 'src/app/models/task.model';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskPriority } from 'src/app/enumerations/task-priority';
import { ListManagerService } from 'src/app/services/list-manager.service';

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

  constructor(private _listManager: ListManagerService) {
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
  }

  public onReorderTask(event) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  public onToggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  public onDeleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      // Delete task
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
  }

  public onQuickAddTask(taskName: string): void {
    if (this.quickAddFormGroup.valid /*&& !this._taskManager.doesNameExist(taskName)*/) {
      // Create new task with name
      // Clear form
      this.quickAddFormGroup.reset();
    }
  }

  public onDetailedAddTask(event): void {
    event.preventDefault();
    // Create new task with detailed view
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
}
