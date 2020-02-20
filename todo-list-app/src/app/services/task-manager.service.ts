import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { ListManagerService } from './list-manager.service';
import { v4 as GenerateUuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  private quickAddTemplate: Task = {
    parentListId: '',
    id: '',
    title: '',
    description: '',
    priority: null,
    isComplete: false,
    dateDue: null,
    dateCompleted: null
  };

  // tslint:disable-next-line: variable-name
  private _isCreatingTask: boolean;
  // tslint:disable-next-line: variable-name
  private _isEditingTask: boolean;

  private _taskUnderEdit: Task;

  constructor(private _listManager: ListManagerService) {

  }

  public get taskUnderEdit(): Task {
    return this._taskUnderEdit;
  }

  public get isCreatingTask(): boolean {
    return this._isCreatingTask;
  }

  public get isEditingTask(): boolean {
    return this._isEditingTask;
  }

  public quickCreateTask(name: string) {
    const newTask: any = {};
    Object.assign(newTask, this.quickAddTemplate);

    // Populate with name and new id
    newTask.parentListId = this._listManager.listBeingViewed.id;
    newTask.id = GenerateUuid();
    newTask.title = name;

    this.pushTaskToList(newTask);
  }

  public createTask(taskData: Task): void {
    const newTask: any = {};
    Object.assign(newTask, this.quickAddTemplate);

    newTask.parentListId = this._listManager.listBeingViewed.id;
    newTask.id = GenerateUuid();
    newTask.title = taskData.title;
    newTask.description = taskData.description;
    newTask.priority = taskData.priority;
    newTask.dateDue = taskData.dateDue;

    this.pushTaskToList(newTask);
    this.stopCreatingTask();
  }

  public deleteTask(taskId: string): void {
    const listToRemoveFrom = this._listManager.listBeingViewed;
    const filteredTasks = listToRemoveFrom.tasks.filter(task => task.id !== taskId);
    listToRemoveFrom.tasks = filteredTasks;
  }

  public beginCreateTask(): void {
    this.cancelEditingTask();
    this._isCreatingTask = true;
  }

  public beginEditingTask(task: Task): void {
    this.cancelCreateTask();

    this._isEditingTask = true;
    this._taskUnderEdit = task;
  }

  public saveEditsToList(edits: Task): void {
    // Save edits
    this._taskUnderEdit.title = edits.title;
    this._taskUnderEdit.description = edits.description;
    this._taskUnderEdit.priority = edits.priority;
    this._taskUnderEdit.dateDue = edits.dateDue;

    // Switch back to static view
    this.stopEditingTask();
  }

  public cancelEditingTask(): void {
    this.stopEditingTask();
  }

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
