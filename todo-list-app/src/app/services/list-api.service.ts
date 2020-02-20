import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TaskList } from '../models/task-list.model';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const SAVED_LISTS = 'saved-lists';

@Injectable({
  providedIn: 'root'
})
export class ListApiService {


  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient) {}

  public fetchAllLists$(): Observable<TaskList[]> {
    const getUri = [environment.api, SAVED_LISTS].join('/');

    return this._http.get(getUri).pipe(
      map((data: TaskList[]) => {
        const lists = data[SAVED_LISTS];
        return lists;
      }),
      catchError(this.handleError('fetchAllLists'))
    );
  }

  public saveAllLists$(lists: any): Observable<void> {
    console.log('posting data: ', lists);
    const postUri = [environment.api, 'saved-lists'].join('/');

    return this._http.post(postUri, lists, { headers : { 'Content-Type': 'application/json' } }).pipe(
      catchError(this.handleError('postAllLists'))
    );
  }

  private handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      console.log('Error: ', error);
      return of(result);
    };
  }
}
