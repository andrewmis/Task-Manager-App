import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { ListManagerService } from './list-manager.service';
import { v4 as GenerateUuid } from 'uuid';

// The default template to use when creating a task.
const quickAddTemplate: Task = {
  parentListId: '',
  id: '',
  title: '',
  description: '',
  priority: null,
  isComplete: false,
  dateDue: null,
  dateCompleted: null
};

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {


  private _isCreatingTask: boolean;
  private _isEditingTask: boolean;
  private _taskUnderEdit: Task;

  constructor(private _listManager: ListManagerService) {}

  /**
   * If a task is currently being created.
   */
  public get isCreatingTask(): boolean {
    return this._isCreatingTask;
  }

  /**
   * If a task is currently being edited.
   */
  public get isEditingTask(): boolean {
    return this._isEditingTask;
  }

  /**
   * The task currently being edited.
   */
  public get taskUnderEdit(): Task {
    return this._taskUnderEdit;
  }

  /**
   * Creates a new task with just the given name set.
   * @param name The name of the task to create.
   */
  public quickCreateTask(name: string) {
    // Start with a task default
    const newTask: any = {};
    Object.assign(newTask, quickAddTemplate);

    // Populate with name and new id
    newTask.parentListId = this._listManager.listBeingViewed.id;
    newTask.id = GenerateUuid();
    newTask.title = name;

    // Push to store
    this.pushTaskToList(newTask);
  }

  /**
   * Creates a new task with the given data and appends it to the task store.
   * @param taskData The data of the task to create.
   */
  public createTask(taskData: Task): void {
        // Start with a task default
    const newTask: any = {};
    Object.assign(newTask, quickAddTemplate);

    // Apply parent ID, new ID, and given properties
    newTask.parentListId = this._listManager.listBeingViewed.id;
    newTask.id = GenerateUuid();
    newTask.title = taskData.title;
    newTask.description = taskData.description;
    newTask.priority = taskData.priority;
    newTask.dateDue = taskData.dateDue;

    // Push to store and end creation state
    this.pushTaskToList(newTask);
    this.stopCreatingTask();
  }

  /**
   * Deletes a task with the given id.
   * @param taskId The id of the task to remove.
   */
  public deleteTask(taskId: string): void {
    // Get the list current being viewed
    const listToRemoveFrom = this._listManager.listBeingViewed;
    // Remove the given task from that list
    const filteredTasks = listToRemoveFrom.tasks.filter(task => task.id !== taskId);
    listToRemoveFrom.tasks = filteredTasks;
  }

  /**
   * Enter the task creation state.
   */
  public beginCreateTask(): void {
    // Guard in case a task is being edited
    this.cancelEditingTask();
    this._isCreatingTask = true;
  }

  /**
   * Enter the task editing state.
   */
  public beginEditingTask(task: Task): void {
    // Guard in case a task is being created
    this.cancelCreateTask();

    this._isEditingTask = true;
    this._taskUnderEdit = task;
  }

  /**
   * Applies a set of edits to the task being edited and exits the edit state.
   * @param edits The edits to save to the task under edit.
   */
  public saveEditsToList(edits: Task): void {
    // Save edits
    this._taskUnderEdit.title = edits.title;
    this._taskUnderEdit.description = edits.description;
    this._taskUnderEdit.priority = edits.priority;
    this._taskUnderEdit.dateDue = edits.dateDue;

    // Switch back to static view
    this.stopEditingTask();
  }

  /**
   * Exit the task editing state.
   */
  public cancelEditingTask(): void {
    this.stopEditingTask();
  }

  /**
   * Exit the task creation state.
   */
  public cancelCreateTask(): void {
    this.stopCreatingTask();
  }

  private pushTaskToList(task: Task): void {
    this._listManager.listBeingViewed.tasks.push(task);
    this._listManager.checkIfListIsComplete();
  }

  private stopCreatingTask(): void {
    this._isCreatingTask = false;
  }

  private stopEditingTask(): void {
    this._taskUnderEdit = undefined;
    this._isEditingTask = false;
  }
}
