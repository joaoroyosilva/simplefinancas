import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule, MatCardModule, MatIconModule, MatDialogModule, MatSelectModule, MatProgressBarModule, MatDatepickerModule, MatRadioModule, MatMenuModule } from '@angular/material';

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
    MatMenuModule
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
    MatMenuModule
  ]
})
export class MaterialModule { }
