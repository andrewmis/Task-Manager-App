import { Component } from '@angular/core';
import { ListApiService } from 'src/app/services/list-api.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TaskList } from 'src/app/models/task-list.model';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'home-view',
    templateUrl: 'home-view.component.html',
    styleUrls: ['home-view.component.scss']
})
export class HomeViewComponent {
  constructor(private _listApiService: ListApiService) {
    this.fetchAllLists$();
  }

  public testTask = {
    id: '11111-11111-11111-11111',
    title: 'Test Task Title',
    description: 'test task description',
    priority: 'High',
    isComplete: false,
    dateAdded: '02/17/2020',
    dateDue: '02/18/2020',
    dateCompleted: null,
    timeCompleted: null
  };

  public testTaskList = {
    id: '22222-22222-22222-22222',
    title: 'Test List Title',
    description: 'test list description',
    allTasksCompleted: false,
    allTasksDueDate: '02/18/2020',
    tasks: [
      {
        id: '33333-33333-33333-33333',
        title: 'Test Task Title 1',
        description: 'test task description',
        priority: 'Low',
        isComplete: false,
        dateAdded: '02/17/2020',
        dateDue: '02/18/2020',
        dateCompleted: null,
        timeCompleted: null
      },
      {
        id: '44444-44444-44444-44444',
        title: 'Test Task Title 2',
        description: 'test task description',
        priority: 'High',
        isComplete: true,
        dateAdded: '02/17/2020',
        dateDue: '02/18/2020',
        dateCompleted: '02/18/2020',
        timeCompleted: null
      }
    ]
  };

  public fetchAllLists$(): Observable<TaskList[]> {
    return this._listApiService.fetchAllLists$().pipe(
      tap((lists) => {
        if (lists) {
          const test2 = lists;
        }
        const test = 1;
      })
    );
  }

}
