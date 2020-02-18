import { Component } from '@angular/core';
import { ListManagerService } from 'src/app/services/list-manager.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'create-task-list-view',
    templateUrl: 'create-task-list-view.component.html',
    styleUrls: ['create-task-list-view.component.scss']
})
export class CreateTaskListViewComponent {

  public listData: FormGroup;
  public minDueDate: Date;

  // tslint:disable-next-line: variable-name
  constructor(private _listManagerService: ListManagerService) {
    this.listData = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      allTasksDue: new FormControl()
    });

    this.minDueDate = new Date(new Date().getDate());
  }

  public onCancelCreate(): void {
    this._listManagerService.cancelCreateState();
  }

  public onCreate(): void {
    const listData = this.listData.value;
    this._listManagerService.createList(listData);
  }

  public canCreateList(): boolean {
    return this.listData.valid;
  }
}
