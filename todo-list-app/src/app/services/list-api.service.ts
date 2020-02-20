import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TaskList } from '../models/task-list.model';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListApiService {

  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient) {}

  public fetchAllLists$(): Observable<TaskList[]> {
    const getUri = ['http://localhost:3000', 'saved-lists'].join('/');
    return this._http.get(getUri).pipe(
      map((data: TaskList[]) => {
        const lists = data['saved-lists'];
        return lists;
      }),
      catchError(this.handleError('fetchApplication', {}))
    );
  }

  // public saveAll$(): Observable<void> {
  //   const
  // }

  private handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      // Return our default result.
      return of(result);
    };
  }
}
