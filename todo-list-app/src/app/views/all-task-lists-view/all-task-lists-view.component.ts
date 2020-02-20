import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ListManagerService } from 'src/app/services/list-manager.service';
import { TaskList } from 'src/app/models/task-list.model';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'all-task-lists-view',
  templateUrl: './all-task-lists-view.component.html',
  styleUrls: ['./all-task-lists-view.component.scss']
})
export class AllTaskListsViewComponent {

  public isReordering = false;
  public isDeleting = false;
  public quickAddFormGroup: FormGroup;

  // tslint:disable-next-line: variable-name
  constructor(private _listManager: ListManagerService) {
    this.quickAddFormGroup = new FormGroup({
      name: new FormControl()
    });
  }

  public get taskLists(): TaskList[] {
    return this._listManager.taskLists;
  }

  public get deleteIcon(): string {
    return this.isDeleting ? 'check' : 'delete';
  }

  public get deleteTooltip(): string {
    return this.isDeleting ? 'Finish deleting task lists' : 'Delete task lists';
  }

  public get reorderIcon(): string {
    return this.isReordering ? 'check' : 'reorder';
  }

  public get reorderTooltip(): string {
    return this.isReordering ? 'Finish reordering tasks' : 'Reorder tasks';
  }

  public get hasList(): boolean {
    return this.taskLists.length > 0;
  }

  public get hasMultipleLists(): boolean {
    return this.taskLists.length > 1;
  }

  public getCompletedTaskCount(list: TaskList): number {
    return this._listManager.getCompletedTaskCount(list);
  }

  public getTaskCount(list: TaskList): number {
    return this._listManager.getTaskCount(list);
  }

  public toggleAllTasksInList(event, listId: string): void {
    const newCompleteValue = event.checked;
    this._listManager.toggleAllTasks(listId, newCompleteValue);
  }

  public onToggleDeleteMode(): void {
    this.isDeleting = !this.isDeleting;
  }

  public onToggleReorderMode(): void {
    this.isReordering = !this.isReordering;
  }

  public onSelectList(list: TaskList): void {
    this._listManager.beginViewingList(list);
  }

  public onReorderTaskList(event) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  public onQuickAddTaskList(): void {
    const listName = this.quickAddFormGroup.controls.name.value;

    if (listName && !this._listManager.doesListExistWithName(listName)) {
      // Create new task with name
      this._listManager.quickCreateList(listName);
      // Clear form
      this.quickAddFormGroup.reset();
    }
  }

  public onDetailedAddTaskList(event): void {
    event.preventDefault();
    // Create new task with detailed view
    this._listManager.beginCreateList();
  }

  public onDeleteTaskList(list: TaskList) {
    const prompt = 'Are you sure you want to delete this list?' +
                   '\nAll of the tasks will also be deleted.';

    if (!confirm(prompt)) {
      return;
    }

    // Delete list
    this._listManager.deleteList(list);

    // Check if should exit delete mode
    if (!this.hasList) {
      this.onToggleDeleteMode();
    }
  }
}
