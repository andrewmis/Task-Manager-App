import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { CreateTaskViewComponent } from './views/create/create-task-view/create-task-view.component';
import { EditTaskListViewComponent } from './views/edit/edit-task-list-view/edit-task-list-view.component';
import { EditTaskViewComponent } from './views/edit/edit-task-view/edit-task-view.component';
import { CreateTaskListViewComponent } from './views/create/create-task-list-view/create-task-list-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { CoreModule } from './core/core.module';
import { TaskListViewComponent } from './views/task-list-view/task-list-view.component';
import { TaskViewComponent } from './views/task-view/task-view.component';
import { AllTaskListsViewComponent } from './views/all-task-lists-view/all-task-lists-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationMenuComponent,
    HomeViewComponent,
    CreateTaskListViewComponent,
    CreateTaskViewComponent,
    EditTaskListViewComponent,
    EditTaskViewComponent,
    TaskListViewComponent,
    TaskViewComponent,
    AllTaskListsViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
