import { Injectable } from '@angular/core';
import { TaskList } from '../models/task-list.model';
import { ListApiService } from './list-api.service';
import { v4 as GenerateUuid } from 'uuid';
import { GetTodaysDate } from '../shared/utilities';

@Injectable({
  providedIn: 'root'
})
export class ListManagerService {
  public taskLists: TaskList[] = [];

  private quickAddTemplate = {
    id: '',
    title: '',
    description: '',
    dateCreate: null,
    allTasksCompleted: false,
    allTasksDueDate: null,
    tasks: []
  };

  // tslint:disable-next-line: variable-name
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

  public get isEditingList(): boolean {
    return this._isEditingList;
  }

  public get isCreatingList(): boolean {
    return this._isCreatingList;
  }

  public get isViewingList(): boolean {
    return this._isViewingList;
  }

  public get listUnderEdit(): TaskList {
    return this._listUnderEdit;
  }

  public get listBeingViewed(): TaskList {
    return this._listBeingViewed;
  }

  public deleteList(listData: TaskList): void {
    const filteredLists = this.taskLists.filter(list => list.id !== listData.id);

    if (this._isViewingList) {
      if (this.listBeingViewed.id === listData.id) {
        this.resetStates();
      }
    }

    this.taskLists = filteredLists;
  }

  public createList(listData: TaskList): void {
    const newList: any = {};
    Object.assign(newList, this.quickAddTemplate);
    newList.id = GenerateUuid();
    newList.title = listData.title;
    newList.description = listData.description;
    newList.allTasksDueDate = listData.allTasksDueDate;

    this.taskLists.push(newList);
    this.endCreateList();
  }

  public quickCreateList(name: string) {
    const newList: any = {};
    Object.assign(newList, this.quickAddTemplate);

    // Populate with name and new id
    newList.id = GenerateUuid();
    newList.title = name;
    newList.dateCreated = GetTodaysDate();

    // Push to db
    this.taskLists.push(newList);
  }

  public cancelCreateState() {
    this._isCreatingList = false;
  }

  public getCompletedTaskCount(list: TaskList): number {
    return list.tasks.filter(task => task.isComplete).length;
  }

  public getTaskCount(list: TaskList): number {
    return list.tasks.length;
  }

  public doesListExistWithName(name: string): boolean {
    return !!this.taskLists.find(list => list.title === name);
  }

  public doesTaskNameExistOnListBeingViewed(name: string): boolean {
    return !!this._listBeingViewed.tasks.find(task => task.title === name);
  }

  public beginCreateList(): void {
    this._isCreatingList = true;
  }

  public endCreateList(): void {
    this._isCreatingList = false;
  }

  public beginViewingList(list: TaskList): void {
    this._isViewingList = true;
    this._listBeingViewed = list;
  }

  public beginEditingList(list: TaskList): void {
    this.stopViewingList();
    this._isEditingList = true;
    this._listUnderEdit = list;
  }

  public saveEditsToList(edits: TaskList): void {
    // Save edits
    this.listUnderEdit.title = edits.title;
    this.listUnderEdit.description = edits.description;
    this.listUnderEdit.allTasksDueDate = edits.allTasksDueDate;

    // Switch back to static view
    this.stopEditingList();
  }

  public cancelEditingList(): void {
    this.stopEditingList();
  }

  private stopEditingList(): void {
    this.beginViewingList(this.listUnderEdit);
    this._listUnderEdit = undefined;
    this._isEditingList = false;
  }

  public stopViewingList(): void {
    this._isViewingList = false;
    this._listBeingViewed = undefined;
  }

  private resetStates() {
    this.stopViewingList();
    this.cancelEditingList();
  }
}
