import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListManagerService {

  // tslint:disable-next-line: variable-name
  private _isCreatingList: boolean;

  constructor() {

  }

  public get isCreatingList(): boolean {
    return this._isCreatingList;
  }

  public createList(listData: any): void {
    // Push list to state store
  }

  public cancelCreateState() {
    this._isCreatingList = false;
  }
}
