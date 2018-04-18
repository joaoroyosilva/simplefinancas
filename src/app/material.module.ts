import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatCardModule, MatIconModule, MatDialogModule, MatSelectModule, MatProgressBarModule, MatDatepickerModule, MatRadioModule, MatMenuModule, MatGridListModule, MatPaginatorModule, MatTableModule, MatSortModule, MatPaginatorIntl } from '@angular/material';
import { getPortuguesePaginatorIntl } from './pt-paginator-intl';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatRadioModule,
    MatMenuModule,
    MatGridListModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
  ],
  declarations: [],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatRadioModule,
    MatMenuModule,
    MatGridListModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
  ],
  providers:[
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() }
  ]
})
export class MaterialModule { }
