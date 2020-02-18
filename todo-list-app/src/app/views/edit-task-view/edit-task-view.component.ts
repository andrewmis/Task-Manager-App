import { Component, Input, OnInit } from '@angular/core';
import { TaskPriority } from 'src/app/enumerations/task-priority';
import { FormGroup, FormControl } from '@angular/forms';
import { GetTodaysDate } from 'src/app/shared/utilities';
import { TaskManagerService } from 'src/app/services/task-manager.service';
import { Task } from 'src/app/models/task.model';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'edit-task-view',
    templateUrl: 'edit-task-view.component.html',
    styleUrls: ['edit-task-view.component.scss']
})
export class EditTaskViewComponent implements OnInit {
  @Input() public parentListId: string;
  @Input() public taskData: Task;

  public title: string;
  public id: string;

  public priorities = TaskPriority;
  public taskDataFormGroup: FormGroup;
  public readonly minDate = GetTodaysDate();

  // tslint:disable-next-line: variable-name
  constructor(private _taskManagerService: TaskManagerService) {
  }

  ngOnInit() {
    this.title = this.taskData.title;
    this.id = this.taskData.id;

    this.taskDataFormGroup = new FormGroup ({
      title: new FormControl(this.taskData.title),
      description: new FormControl(this.taskData.description),
      priority: new FormControl(this.taskData.priority),
      dateDue: new FormControl(this.taskData.dateDue)
    });
  }

  public canSaveTask() {
    return this.taskDataFormGroup.valid;
  }

  public onCancelEdit() {
    // _taskManagerService.cancelCreateState();
  }

  private createObjectFromData() {
    const taskData = this.taskDataFormGroup.value;

    return {
      parentListId: this.parentListId,
      id: taskData.id,
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
