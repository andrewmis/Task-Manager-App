import { Injectable } from '@angular/core';
import { TaskList } from '../models/task-list.model';
import { ListApiService } from './list-api.service';
import { v4 as GenerateUuid } from 'uuid';
import { GetTodaysDate } from '../shared/utilities';

// The default template to use when creating a list.
const quickAddTemplate: TaskList = {
  id: '',
  title: '',
  description: '',
  allTasksCompleted: false,
  allTasksCompletedDate: '',
  allTasksDueDate: '',
  tasks: []
};

@Injectable({
  providedIn: 'root'
})
export class ListManagerService {
  public taskLists: TaskList[] = [];

  private _isCreatingList: boolean;
  private _isEditingList: boolean;
  private _isViewingList: boolean;

  private _listUnderEdit: TaskList;
  private _listBeingViewed: TaskList;

  constructor(private _listApiService: ListApiService) {
    this._listApiService.fetchAllLists$().subscribe((lists) => {
      if (lists) {
        this.taskLists = lists;
      }
    });
  }

  /**
   * If a list is currently being edited.
   */
  public get isEditingList(): boolean {
    return this._isEditingList;
  }

  /**
   * If a list is currently being created.
   */
  public get isCreatingList(): boolean {
    return this._isCreatingList;
  }

  /**
   * If a list is currently being viewed.
   */
  public get isViewingList(): boolean {
    return this._isViewingList;
  }

  /**
   * The list currently being edited.
   */
  public get listUnderEdit(): TaskList {
    return this._listUnderEdit;
  }

  /**
   * The list currently being viewed.
   */
  public get listBeingViewed(): TaskList {
    return this._listBeingViewed;
  }

  /**
   * Deletes a list with the given id.
   * @param listId The id of the list to remove.
   */
  public deleteList(listId: string): void {
    // Get array of lists without given list
    const filteredLists = this.taskLists.filter(list => list.id !== listId);
    // Apply that filtered list to the local service store
    this.taskLists = filteredLists;
  }

  /**
   * Creates a new list with the given data and appends it to the list store.
   * @param listData The data of the list to create.
   */
  public createList(listData: TaskList): void {
    // Start with a list default
    const newList: any = {};
    Object.assign(newList, quickAddTemplate);

    // Apply new ID and given properties
    newList.id = GenerateUuid();
    newList.title = listData.title;
    newList.description = listData.description;
    newList.allTasksDueDate = listData.allTasksDueDate;

    // Push to store and end creation state
    this.taskLists.push(newList);
    this.endCreateList();
  }

  /**
   * Creates a new list with just the given name set.
   * @param name The name of the list to create.
   */
  public quickCreateList(name: string) {
    // Start with a list default
    const newList: any = {};
    Object.assign(newList, quickAddTemplate);

    // Populate with name and new id
    newList.id = GenerateUuid();
    newList.title = name;
    newList.dateCreated = GetTodaysDate();

    // Push to store
    this.taskLists.push(newList);
  }

  /**
   * Exits the list creation state.
   */
  public cancelCreateState() {
    this._isCreatingList = false;
  }

  /**
   * Returns the given list's completed task count.
   */
  public getCompletedTaskCount(list: TaskList): number {
    return list.tasks.filter(task => task.isComplete).length;
  }

  /**
   * Returns the given list's task count.
   */
  public getTaskCount(list: TaskList): number {
    return list.tasks.length;
  }

  /**
   * Checks if a given list name is already in use by a list.
   * @param name The name to check.
   */
  public doesListExistWithName(name: string): boolean {
    return !!this.taskLists.find(list => list.title === name);
  }

  /**
   * Checks if a given task name is already in use by a task.
   * @param name The task name to check.
   */
  public doesTaskNameExistOnListBeingViewed(name: string): boolean {
    return !!this._listBeingViewed.tasks.find(task => task.title === name);
  }

  /**
   * Enter the list creation state.
   */
  public beginCreateList(): void {
    this._isCreatingList = true;
  }

  /**
   * Exit the list creation state.
   */
  public endCreateList(): void {
    this._isCreatingList = false;
  }

  /**
   * Enter the list viewing state.
   * @param list The list to begin viewing.
   */
  public beginViewingList(list: TaskList): void {
    this.cancelCreateState();
    this._isViewingList = true;
    this._listBeingViewed = list;
  }

  /**
   * Enter the list editing state.
   * @param list The list to begin editing.
   */
  public beginEditingList(list: TaskList): void {
    this._isEditingList = true;
    this._listUnderEdit = list;
  }

  /**
   * Applies a set of edits to the list being edited and exits the edit state.
   * @param edits The edits to save to the list under edit.
   */
  public saveEditsToList(edits: TaskList): void {
    // Save edits
    this.listUnderEdit.title = edits.title;
    this.listUnderEdit.description = edits.description;
    this.listUnderEdit.allTasksDueDate = edits.allTasksDueDate;

    // Switch back to static view
    this.stopEditingList();
  }

  /**
   * Exits the list editing state and returns to viewing state.
   */
  public cancelEditingList(): void {
    this.stopEditingList();
  }

  /**
   * Exits the list viewing state.
   */
  public stopViewingList(): void {
    this.cancelEditingList();
    this._isViewingList = false;
    this._listBeingViewed = undefined;
  }

  /**
   * Toggle/Untoggles all of the tasks in the list with the given id.
   * @param listId The id of the list to toggle the tasks of.
   * @param newCompleteValue The new task completion value.
   */
  public toggleAllTasks(listId, newCompleteValue): void {
    const listToToggle = this.taskLists.find(list => list.id === listId);

    // Iterate through tasks and update completion properties
    listToToggle.tasks.forEach(task => {
      // Set completion status
      task.isComplete = newCompleteValue;

      // Set completion date
      if (newCompleteValue) {
        task.dateCompleted = GetTodaysDate();
      }
    });

    // Update list's completion status
    listToToggle.allTasksCompleted = newCompleteValue;
  }

  /**
   * Checks if a list is in/complete and updates it's completion property.
   * @param list (Optional) The list to check.
   */
  public checkIfListIsComplete(list?: TaskList): void {
    const listToCheck = list ? list : this.listBeingViewed;
    const incompleteTasks = listToCheck.tasks.filter(task => !task.isComplete);

    if (incompleteTasks.length < 1) {
      // Complete list
      listToCheck.allTasksCompleted = true;
      listToCheck.allTasksCompletedDate = GetTodaysDate();
    } else {
      // Incomplete list
      listToCheck.allTasksCompleted = false;
      listToCheck.allTasksCompletedDate = undefined;
    }
  }

  /**
   * Exits the list editing state and returns to viewing state.
   */
  private stopEditingList(): void {
    this.beginViewingList(this.listUnderEdit);
    this._listUnderEdit = undefined;
    this._isEditingList = false;
  }
}
