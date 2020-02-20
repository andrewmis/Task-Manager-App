import { Component } from '@angular/core';
import { ListManagerService } from 'src/app/services/list-manager.service';
import { ListApiService } from 'src/app/services/list-api.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'navigation-menu',
    templateUrl: 'navigation-menu.component.html',
    styleUrls: ['navigation-menu.component.scss']
})
export class NavigationMenuComponent {
  public appName = 'Personal Task Manager';

  constructor(private _listApi: ListApiService,
              private _listManager: ListManagerService) {}

  public onSaveData(): void {
    const saveData = this._listManager.taskLists;
    const toSave: any = {
      'saved-lists': saveData
    };

    if (!toSave) {
      return alert('There are no lists to be saved.');
    }

    this._listApi.saveAllLists$(toSave).subscribe(
      result => {
      alert('Successfully saved lists!');
    }, error => {
      alert('The list data could not be saved.');
    });
  }
}
