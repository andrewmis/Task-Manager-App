import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    DragDropModule
  ],
})
export class SharedModule {}
