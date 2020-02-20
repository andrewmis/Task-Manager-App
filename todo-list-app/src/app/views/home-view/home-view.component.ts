import { Component } from '@angular/core';
import { ListApiService } from 'src/app/services/list-api.service';
import { TaskList } from 'src/app/models/task-list.model';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ListManagerService } from 'src/app/services/list-manager.service';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'home-view',
    templateUrl: 'home-view.component.html',
    styleUrls: ['home-view.component.scss']
})
export class HomeViewComponent {

  // tslint:disable-next-line: variable-name
  constructor(private _listManager: ListManagerService,
              // tslint:disable-next-line: variable-name
              private _taskManager: TaskManagerService) {}

  public get inDefaultState(): boolean {
    const inListState = this.inListEditState || this.inListCreationState || this.inListViewState;
    const inTaskState = this.inTaskEditState || this.inTaskCreationState;

    return !inListState && !inTaskState;
  }

  public get inListCreationState(): boolean {
    return this._listManager.isCreatingList;
  }

  public get inListEditState(): boolean {
    return this._listManager.isEditingList;
  }

  public get inListViewState(): boolean {
    return this._listManager.isViewingList;
  }

  public get inTaskCreationState(): boolean {
    return this._taskManager.isCreatingTask;
  }

  public get inTaskEditState(): boolean {
    return this._taskManager.isEditingTask;
  }
}
