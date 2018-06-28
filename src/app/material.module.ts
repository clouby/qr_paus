import { NgModule } from '@angular/core';
import { MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatListModule,
        MatGridListModule,
        MatRadioModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatMenuModule
        } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

const material_modules = [
  CdkTableModule,
  MatTableModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatListModule,
  MatMenuModule,
  MatGridListModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatExpansionModule
];

@NgModule({
  imports: [
    ...material_modules
  ],
  exports: [
    ...material_modules
  ]
})

export class MaterialModule { }
