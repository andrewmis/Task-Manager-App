import { Component, Input, OnInit } from '@angular/core';
import { TaskList } from 'src/app/models/task-list.model';
import { Task } from 'src/app/models/task.model';
import { FormGroup, FormControl } from '@angular/forms';
import { GetTodaysDate } from 'src/app/shared/utilities';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'edit-task-list-view',
    templateUrl: 'edit-task-list-view.component.html',
    styleUrls: ['edit-task-list-view.component.scss']
})
export class EditTaskListViewComponent implements OnInit {
  @Input() listData: TaskList;

  public id: string;
  public title: string;
  public description: string;
  public allTaskCompleted: boolean;
  public allTasksDue: Date;
  public tasks: Task[];

  public minDate = GetTodaysDate();

  public listFields: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.id = this.listData.id;
    this.title = this.listData.title;

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

  }
}
