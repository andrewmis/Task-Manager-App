import { Component } from '@angular/core';
import { ListManagerService } from 'src/app/services/list-manager.service';
import { TaskManagerService } from 'src/app/services/task-manager.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'home-view',
    templateUrl: 'home-view.component.html',
    styleUrls: ['home-view.component.scss']
})
export class HomeViewComponent {

  constructor(private _listManager: ListManagerService,
              private _taskManager: TaskManagerService) {}

  /**
   * Check if a list is either being created, viewed, or edited.
   */
  public get inDefaultState(): boolean {
    return !(this.inListEditState ||
           this.inListCreationState ||
           this.inListViewState);
  }

  /**
   * Check if a list is being created.
   */
  public get inListCreationState(): boolean {
    return this._listManager.isCreatingList;
  }

  /**
   * Check if a list is being edited.
   */
  public get inListEditState(): boolean {
    return this._listManager.isEditingList;
  }

  /**
   * Check if a list is being viewed.
   */
  public get inListViewState(): boolean {
    return this._listManager.isViewingList;
  }

  /**
   * Check if a task is being created.
   */
  public get inTaskCreationState(): boolean {
    return this._taskManager.isCreatingTask;
  }

  /**
   * Check if a task is being edited.
   */
  public get inTaskEditState(): boolean {
    return this._taskManager.isEditingTask;
  }
}
