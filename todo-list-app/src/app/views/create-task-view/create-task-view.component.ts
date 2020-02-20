import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { v4 as GenerateUuid } from 'uuid';
import { TaskPriority } from 'src/app/enumerations/task-priority';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { GetTodaysDate } from 'src/app/shared/utilities';
import { ListManagerService } from 'src/app/services/list-manager.service';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'create-task-view',
  templateUrl: 'create-task-view.component.html',
  styleUrls: ['create-task-view.component.scss']
})
export class CreateTaskViewComponent {

  @Input() public parentListId: string;

  public priorities = TaskPriority;
  public taskDataFormGroup: FormGroup;
  public readonly minDate = new Date(GetTodaysDate());

  // tslint:disable-next-line: variable-name
  constructor(private _taskManager: TaskManagerService,
              private _listManager: ListManagerService) {
    this.taskDataFormGroup = new FormGroup ({
      title: new FormControl(''),
      description: new FormControl(''),
      priority: new FormControl(),
      dateDue: new FormControl()
    });
  }

  public canCreateTask() {
    const name = this.taskDataFormGroup.controls.title.value;
    return this.taskDataFormGroup.valid && !this._listManager.doesTaskNameExistOnListBeingViewed(name);
  }

  public onCreate() {
    const taskData = this.taskDataFormGroup.value;
    if (taskData.dateDue) {
      taskData.dateDue = taskData.dateDue.toLocaleDateString();
    }

    this._taskManager.createTask(taskData);
  }

  public onCancelCreate() {
    this._taskManager.cancelCreateTask();
  }
}
