import { Injectable } from '@angular/core';
import { TaskList } from '../models/task-list.model';
import { Store } from '@datorama/akita';

@Injectable({
  providedIn: 'root',
})
export class AppStateStore {
  private _store: Store<TaskList[]>;
 }
