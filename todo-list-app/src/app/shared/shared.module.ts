import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class SharedModule {}
