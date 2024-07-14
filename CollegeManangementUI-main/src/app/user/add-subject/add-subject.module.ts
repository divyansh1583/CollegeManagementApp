import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddSubjectRoutingModule } from './add-subject-routing.module';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { SubjectDialogComponent } from './subject-dialog/subject-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AddSubjectComponent,
    SubjectDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    AddSubjectRoutingModule,
    MatOptionModule,
    MatSelectModule
  
  ]
})
export class AddSubjectModule { }
