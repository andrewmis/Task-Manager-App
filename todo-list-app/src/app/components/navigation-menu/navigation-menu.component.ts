import { Component } from '@angular/core';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'navigation-menu',
    templateUrl: 'navigation-menu.component.html',
    styleUrls: ['navigation-menu.component.scss']
})
export class NavigationMenuComponent {
  public appName = 'Personal Task Manager';

  constructor() {}
}
