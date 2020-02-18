import { Component, Input, OnInit } from '@angular/core';
import { TaskList } from 'src/app/models/task-list.model';
import { Task } from 'src/app/models/task.model';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'task-list-view',
    templateUrl: 'task-list-view.component.html',
    styleUrls: ['task-list-view.component.scss']
})
export class TaskListViewComponent implements OnInit {
  @Input() listData: TaskList;

  public title: string;
  public description: string;
  public tasks: Task[];

  public isEditing = false;
  public quickAddFormGroup: FormGroup;

  constructor() {
    this.quickAddFormGroup = new FormGroup({
      name: new FormControl()
    });
  }

  ngOnInit() {
    this.title = this.listData.title;
    this.description = this.listData.description;
    this.tasks = this.listData.tasks;
  }

  public toggleTask(event) {
    const taskId = event.option.value;
    const newIsComplete = event.option.selected;
  }

  public onReorderTask(event) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  public onToggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  public onDeleteTask(taskId: string): void {
    if (confirm('Are you sure you want to delete this task?')) {
      // Delete task
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
  }

  public onQuickAddTask(taskName: string): void {
    if (this.quickAddFormGroup.valid) {
      // Create new task with name
      // Clear form
      this.quickAddFormGroup.reset();
    }
  }
}
