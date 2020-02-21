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

  constructor(private _listManagerService: ListManagerService) {
    this.listDataFormGroup = new FormGroup({
      title: new FormControl(),
      description: new FormControl(),
      allTasksDueDate: new FormControl()
    });
  }

  /**
   * Notify the list manager service to exit creation state.
   */
  public onCancelCreate(): void {
    this._listManagerService.cancelCreateState();
  }

  /**
   * Pass the form data to the list manager service to create a new list.
   */
  public onCreate(): void {
    // Get the form data
    const listData = this.listDataFormGroup.value;
    listData.allTasksDueDate = listData.allTasksDueDate.toLocaleDateString();

    // Give to list manager service
    this._listManagerService.createList(listData);
  }

  /**
   * Checks if the form group data is valid for creation.
   */
  public canCreateList(): boolean {
    const name = this.listDataFormGroup.controls.title;
    let nameIsValid = false;

    // Check for unique list name
    if (name) {
      nameIsValid = !this._listManagerService.doesListExistWithName(name.value);
    }

    return this.listDataFormGroup.valid && nameIsValid;
  }
}
