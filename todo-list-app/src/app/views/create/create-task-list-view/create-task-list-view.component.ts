import { Component } from '@angular/core';
import { ListManagerService } from 'src/app/services/list-manager.service';
import { FormGroup, FormControl } from '@angular/forms';
import { GetTodaysDate } from 'src/app/shared/utilities';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'create-task-list-view',
    templateUrl: 'create-task-list-view.component.html',
    styleUrls: ['create-task-list-view.component.scss']
})
export class CreateTaskListViewComponent {

  public listDataFormGroup: FormGroup;
  public minDueDate = new Date(GetTodaysDate());

  // tslint:disable-next-line: variable-name
  constructor(private _listManagerService: ListManagerService) {
    this.listDataFormGroup = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      allTasksDueDate: new FormControl()
    });

  }

  public onCancelCreate(): void {
    this._listManagerService.cancelCreateState();
  }

  public onCreate(): void {
    const listData = this.listDataFormGroup.value;
    listData.allTasksDueDate = listData.allTasksDueDate.toLocaleDateString();

    this._listManagerService.createList(listData);
  }

  public canCreateList(): boolean {
    const name = this.listDataFormGroup.controls.title;
    let nameIsValid = false;

    if (name) {
      nameIsValid = !this._listManagerService.doesListExistWithName(name.value);
    }

    return this.listDataFormGroup.valid && nameIsValid;
  }
}
