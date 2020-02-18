// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { HomeViewComponent } from './home-view.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
      HomeViewComponent,
  ],
  exports: [
      HomeViewComponent,
  ]
})
export class HomeViewModule {

}
