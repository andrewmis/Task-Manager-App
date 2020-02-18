import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { v4 as GenerateUuid } from 'uuid';
import { TaskPriority } from 'src/app/enumerations/task-priority';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { GetTodaysDate } from 'src/app/shared/utilities';


@Component({
  // tslint:disable-next-line: component-selector
  selector: 'create-task-view',
  templateUrl: 'create-task-view.component.html',
  styleUrls: ['create-task-view.component.scss']
})
export class CreateTaskViewComponent {

  @Input() public parentListId: string;

  public priorities = TaskPriority;
  public taskData: FormGroup;
  public expanded = true;
  public readonly minDate = GetTodaysDate();

  // tslint:disable-next-line: variable-name
  constructor(private _taskManagerService: TaskManagerService) {
    this.taskData = new FormGroup ({
      title: new FormControl(''),
      description: new FormControl(''),
      priority: new FormControl(),
      dateDue: new FormControl()
    });
  }

  public canCreateTask() {
    return this.taskData.valid;
  }

  public onCancelCreate() {
    // _taskManagerService.cancelCreateState();
  }

  private createObjectFromData() {
    const taskData = this.taskData.value;

    return {
      parentListId: this.parentListId,
      id: GenerateUuid(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      isComplete: false,
      dateAdded: GetTodaysDate(),
      dateDue: taskData.dateDue,
      dateCompleted: undefined,
      timeCompleted: undefined
    };
  }
}
