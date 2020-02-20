import { Component, Input, OnInit } from '@angular/core';
import { TaskList } from 'src/app/models/task-list.model';
import { Task } from 'src/app/models/task.model';
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

  public id: string;
  public title: string;
  public description: string;
  public allTaskCompleted: boolean;
  public allTasksDue: Date;
  public tasks: Task[];

  public minDate = GetTodaysDate();

  public listFields: FormGroup;

  constructor(private _listManager: ListManagerService) {
    this.listData = this._listManager.listUnderEdit;
  }

  ngOnInit() {
    const copyOfList: any = {};
    Object.assign(copyOfList, this.listData);

    this.id = copyOfList.id;
    this.title = copyOfList.title;
    this.description = copyOfList.description;
    this.allTaskCompleted = copyOfList.allTaskCompleted;
    this.allTasksDue = copyOfList.allTasksDue;
    this.tasks = copyOfList.tasks;

    this.listFields = new FormGroup ({
      title: new FormControl(this.title),
      description: new FormControl(this.description),
      allTasksDueDate: new FormControl(this.allTasksDue)
    });
  }

  public canSaveList(): boolean {
    return this.listFields.valid && this.listFields.dirty;
  }

  public onSave(): void {

  }

  public onCancelEdit(): void {
    this._listManager.cancelEditingList();
  }
}
