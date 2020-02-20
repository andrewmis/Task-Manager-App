import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatInputModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatCardModule,
  MatDividerModule,
  MatListModule,
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatInputModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatCheckboxModule,
  ]
})
export class MaterialModule {}
