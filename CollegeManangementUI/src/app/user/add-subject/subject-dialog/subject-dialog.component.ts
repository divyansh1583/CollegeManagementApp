import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomValidators} from 'src/app/directives/validators';
import { Course } from 'src/app/models/course.model';
import { Subject } from 'src/app/models/subject.model';

@Component({
  selector: 'app-subject-dialog',
  templateUrl: './subject-dialog.component.html',
  styleUrls: ['./subject-dialog.component.scss']
})
export class SubjectDialogComponent {
  subject: Subject= { id: 0, name: '', courseId:0,semester:'',marks:0 };
  protected courses: Course[] = [];
  constructor(
    public dialogRef: MatDialogRef<SubjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { 
    this.courses=data.courses;
  }

  subjectForm = this.formBuilder.group({
    name: [this.data.subject.name, Validators.required],
    courseId: [this.data.subject.courseId, Validators.required],
    semester: [this.data.subject.semester, Validators.required],
    marks: [this.data.subject.marks, [Validators.required,CustomValidators.marksRangeValidator]]
  });

  onSave() {
    if (this.subjectForm.valid) {
       this.subject = {
        id: this.data.subject.id,
        name: this.subjectForm.get('name')?.value,
        courseId: this.subjectForm.get('courseId')?.value,
        semester: this.subjectForm.get('semester')?.value,
        marks: this.subjectForm.get('marks')?.value
      };
    }
    const index = this.data.subjects.findIndex((subject: Subject) => subject.id === this.data.subject.id);
    if (index > -1) {
      // Update existing subject
      this.data.subjects[index] = this.subject;
      localStorage.setItem('storedsubjects', JSON.stringify(this.data.subjects));
    } else {
      // Add new subject
      this.data.subjects.push(this.subject);
      localStorage.setItem('storedsubjects', JSON.stringify(this.data.subjects));
    }
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
