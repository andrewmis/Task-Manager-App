import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  public parentName: string;
  public priorities = TaskPriority;
  public taskDataFormGroup: FormGroup;
  public minDate = new Date(GetTodaysDate());

  constructor(private _taskManager: TaskManagerService,
              private _listManager: ListManagerService) {
    this.taskDataFormGroup = new FormGroup ({
      title: new FormControl(''),
      description: new FormControl(''),
      priority: new FormControl(),
      dateDue: new FormControl()
    });
    this.parentName = this._listManager.listBeingViewed.title;
  }

  /**
   * Checks if the form group data is valid for task creation.
   */
  public canCreateTask() {
    const name = this.taskDataFormGroup.controls.title.value;
    return this.taskDataFormGroup.valid && !this._listManager.doesTaskNameExistOnListBeingViewed(name);
  }

  /**
   * Parses the form group data and creates a new task.
   */
  public onCreate() {
    // Get form data
    const taskData = this.taskDataFormGroup.value;
    // Format input date
    if (taskData.dateDue) {
      taskData.dateDue = taskData.dateDue.toLocaleDateString();
    }
    // Send data to task manager service to create new task
    this._taskManager.createTask(taskData);
  }

  /**
   * Exits the task creation view.
   */
  public onCancelCreate() {
    this._taskManager.cancelCreateTask();
  }
}
