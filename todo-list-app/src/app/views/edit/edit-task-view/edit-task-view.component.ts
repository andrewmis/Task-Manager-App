import { Component, Input, OnInit } from '@angular/core';
import { TaskPriority } from 'src/app/enumerations/task-priority';
import { FormGroup, FormControl } from '@angular/forms';
import { GetTodaysDate } from 'src/app/shared/utilities';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { Task } from 'src/app/models/task.model';
import { ListManagerService } from 'src/app/services/list-manager.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'edit-task-view',
    templateUrl: 'edit-task-view.component.html',
    styleUrls: ['edit-task-view.component.scss']
})
export class EditTaskViewComponent implements OnInit {
  public taskData: Task;

  public title: string;
  public id: string;

  public priorities = TaskPriority;
  public taskDataFormGroup: FormGroup;
  public readonly minDate = new Date(GetTodaysDate());

  // tslint:disable-next-line: variable-name
  constructor(private _taskManager: TaskManagerService,
              private _listManager: ListManagerService) {
    this.taskData = this._taskManager.taskUnderEdit;
  }

  ngOnInit() {
    this.title = this.taskData.title;
    this.id = this.taskData.id;

    const formattedDate = this.taskData.dateDue ? new Date(this.taskData.dateDue) : '';
    this.taskDataFormGroup = new FormGroup ({
      title: new FormControl(this.taskData.title),
      description: new FormControl(this.taskData.description),
      priority: new FormControl(this.taskData.priority),
      dateDue: new FormControl(formattedDate)
    });
  }

  public canSaveTask() {
    const name = this.taskDataFormGroup.controls.title.value;
    let nameIsUnique = true;

    if (name !== this.title && this._listManager.doesTaskNameExistOnListBeingViewed(name)) {
      nameIsUnique = false;
    }
    return this.taskDataFormGroup.valid && nameIsUnique;
  }

  public onSaveEdits() {
    const edits = this.taskDataFormGroup.value;
    if (edits.dateDue) {
      edits.dateDue = edits.dateDue.toLocaleDateString();
    }

    this._taskManager.saveEditsToList(edits);
  }

  public onCancelEdit() {
    this._taskManager.cancelEditingTask();
  }
}
