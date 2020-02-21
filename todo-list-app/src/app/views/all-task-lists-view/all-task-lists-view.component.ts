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

  constructor(private _listManager: ListManagerService) {
    this.quickAddFormGroup = new FormGroup({
      name: new FormControl()
    });
  }

  /**
   * Get all task lists from the list manager service.
   */
  public get taskLists(): TaskList[] {
    return this._listManager.taskLists;
  }

  /**
   * Gets the appropriate icon based on the delete state.
   */
  public get deleteIcon(): string {
    return this.isDeleting ? 'check' : 'delete';
  }

  /**
   * Gets the appropriate tooltip based on the delete state.
   */
  public get deleteTooltip(): string {
    return this.isDeleting ? 'Finish deleting task lists' : 'Delete task lists';
  }

  /**
   * Gets the appropriate icon based on the reorder state.
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
   * Checks if there is at least one list.
   */
  public get hasList(): boolean {
    return this.taskLists.length > 0;
  }

  /**
   * Checks if there is more than one list.
   */
  public get hasMultipleLists(): boolean {
    return this.taskLists.length > 1;
  }

  /**
   * Toggles the ability to delete lists.
   */
  public onToggleDeleteMode(): void {
    this.isDeleting = !this.isDeleting;
  }

  /**
   * Toggles the ability to reorder lists.
   */
  public onToggleReorderMode(): void {
    this.isReordering = !this.isReordering;
  }

  /**
   * On selection of a list, put it into viewing mode.
   * @param list The list that's being selected.
   */
  public onSelectList(list: TaskList): void {
    this._listManager.beginViewingList(list);
  }

  /**
   * On reordering a list, update it in the task list array.
   * @param event The event emitted on reordering a list.
   */
  public onReorderTaskList(event) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  /**
   * On using the quick add, validate the input list name and create a list.
   */
  public onQuickAddTaskList(): void {
    const listName = this.quickAddFormGroup.controls.name.value;

    if (listName && !this._listManager.doesListExistWithName(listName)) {
      // Create new task with name
      this._listManager.quickCreateList(listName);
      // Clear form
      this.quickAddFormGroup.reset();
    }
  }

  /**
   * On choosing to advance create, begin creating a list.
   * @param event The event emitted thrown.
   */
  public onDetailedAddTaskList(event): void {
    event.preventDefault();
    // Create new task with detailed view
    this._listManager.beginCreateList();
  }

  /**
   * On choosing to delete a list, prompt the user before deleting it.
   * @param list The list to delete.
   */
  public onDeleteTaskList(list: TaskList) {
    const prompt = 'Are you sure you want to delete this list?' +
                   '\nAll of the tasks will also be deleted.';

    if (!confirm(prompt)) {
      return;
    }

    // Delete list
    this._listManager.deleteList(list.id);

    // Check if should exit delete mode
    if (!this.hasList) {
      this.onToggleDeleteMode();
    }
  }

  /**
   * Get the completed task count of a given list.
   * @param list The list to get the completed task count of.
   */
  public getCompletedTaskCount(list: TaskList): number {
    return this._listManager.getCompletedTaskCount(list);
  }

  /**
   * Get the task count of a given list.
   * @param list The list to get the task count of.
   */
  public getTaskCount(list: TaskList): number {
    return this._listManager.getTaskCount(list);
  }

  /**
   * Toggles all of the tasks with the given list id.
   * @param event The event emitted when toggling a checkbox.
   * @param listId The id of the list to toggle.
   */
  public toggleAllTasksInList(event, listId: string): void {
    const newCompleteValue = event.checked;
    this._listManager.toggleAllTasks(listId, newCompleteValue);
  }
}
