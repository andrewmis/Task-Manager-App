import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  // tslint:disable-next-line: variable-name
  private _isCreatingTask: boolean;
  // tslint:disable-next-line: variable-name
  private _isEditingTask: boolean;

  constructor() {

  }

  public get isCreatingTask(): boolean {
    return this._isCreatingTask;
  }

  public get isEditingTask(): boolean {
    return this._isEditingTask;
  }
}
