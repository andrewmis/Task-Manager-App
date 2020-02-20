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
    dateAdded: null,
    dateDue: null,
    dateCompleted: null,
    timeCompleted: null
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

    // Push to db
    this._listManager.listBeingViewed.tasks.push(newTask);
  }
}
