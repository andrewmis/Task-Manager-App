import { Component, OnInit } from '@angular/core';
import { TaskList } from 'src/app/models/task-list.model';
import { FormGroup, FormControl } from '@angular/forms';
import { GetTodaysDate } from 'src/app/shared/utilities';
import { ListManagerService } from 'src/app/services/list-manager.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'edit-task-list-view',
    templateUrl: 'edit-task-list-view.component.html',
    styleUrls: ['edit-task-list-view.component.scss']
})
export class EditTaskListViewComponent implements OnInit {

  public listData: TaskList;
  public minDate = new Date(GetTodaysDate());

  public listFields: FormGroup;

  constructor(private _listManager: ListManagerService) {
    this.listData = this._listManager.listUnderEdit;
  }

  ngOnInit() {
    const formattedDate = this.listData.allTasksDueDate ? new Date(this.listData.allTasksDueDate) : '';

    this.listFields = new FormGroup ({
      title: new FormControl(this.listData.title),
      description: new FormControl(this.listData.description),
      allTasksDueDate: new FormControl(formattedDate)
    });
  }

  /**
   * Checks if the form data is valid and can be saved to the current list.
   */
  public canSaveList(): boolean {
    const name = this.listFields.controls.title.value;
    let nameIsUnique = true;

    // Verify that the name is valid/unique
    if (name !== this.listData.title && this._listManager.doesListExistWithName(name)) {
      nameIsUnique = false;
    }

    return this.listFields.valid && nameIsUnique;
  }

  /**
   * Save the edit data to the list.
   */
  public onSave(): void {
    // Get form data
    const edits = this.listFields.value;

    // Format input date if supplied
    if (edits.allTasksDueDate) {
      edits.allTasksDueDate = edits.allTasksDueDate.toLocaleDateString();
    }

    this._listManager.saveEditsToList(edits);
  }

  /**
   * Exits the list editing state.
   */
  public onCancelEdit(): void {
    this._listManager.cancelEditingList();
  }
}
