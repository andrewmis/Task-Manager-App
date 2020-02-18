import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TaskList } from '../models/task-list.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListApiService {

  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient) {}

  public fetchAllLists$(): Observable<any> {
    const getUri = ['http://localhost:3000', 'saved-lists'].join('/');
    return this._http.get(getUri);
  }

  // public saveAll$(): Observable<void> {
  //   const
  // }

  private handleError(operation = 'operation', suppressErrors: boolean, result?: any) {
    return (error: any): Observable<any> => {
      if (!suppressErrors) {
        // Log the error to the console.
        console.error(error);
      }
      // Return our default result.
      return of(result);
    };
  }
}
