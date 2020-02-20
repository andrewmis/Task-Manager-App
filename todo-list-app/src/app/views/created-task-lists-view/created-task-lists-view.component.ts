import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ListManagerService } from 'src/app/services/list-manager.service';
import { TaskList } from 'src/app/models/task-list.model';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'created-task-lists-view',
  templateUrl: './created-task-lists-view.component.html',
  styleUrls: ['./created-task-lists-view.component.scss']
})
export class CreatedTaskListsViewComponent {

  public isReordering = false;
  public isDeleting = false;
  public quickAddFormGroup: FormGroup;

  // private uniqueNameValidator: Function;

  // tslint:disable-next-line: variable-name
  constructor(private _listManager: ListManagerService) {
    // this.uniqueNameValidator = this.nameValidator(this._listManager);
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

  public getCompletedTaskCount(list: TaskList): number {
    return this._listManager.getCompletedTaskCount(list);
  }

  public getTaskCount(list: TaskList): number {
    return this._listManager.getTaskCount(list);
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

    if (this.quickAddFormGroup.valid && !this._listManager.doesListExistWithName(listName)) {
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
    this._listManager.deleteList(list);
  }

  // private validateName(control: FormControl) {
  //   // return this.uniqueNameValidator(control);
  //   return (control: FormControl) => {
  //     if (!this._listManager.doesListExistWithName(control.value)) {
  //       return;
  //     } else {
  //       return new Error('A list already exists with that name.');
  //     }
  //   };
  // }

  // private nameValidator(listService: ListManagerService) {
  //   return (control: FormControl): Error | null => {
  //     if (!listService.doesListExistWithName(control.value)) {
  //       return;
  //     } else {
  //       return new Error('A list already exists with that name.');
  //     }
  //   }
  // }
}
