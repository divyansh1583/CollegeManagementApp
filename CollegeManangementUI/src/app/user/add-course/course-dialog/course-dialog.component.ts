import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent {
  course: Course= { id: 0, name: '', duration: '' };

  constructor(
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  courseForm = this.formBuilder.group({
    name: [this.data.course.name, Validators.required],
    duration: [this.data.course.duration, Validators.required]
  });

  onSave() {
    if (this.courseForm.valid) {
       this.course = {
        id: this.data.course.id,
        name: this.courseForm.get('name')?.value,
        duration: this.courseForm.get('duration')?.value
      };
    }
    const index = this.data.courses.findIndex((course: Course) => course.id === this.data.course.id);
    if (index > -1) {
      // Update existing course
      this.data.courses[index] = this.course;
      localStorage.setItem('storedCourses', JSON.stringify(this.data.courses));
    } else {
      // Add new course
      this.data.courses.push(this.course);
      localStorage.setItem('storedCourses', JSON.stringify(this.data.courses));
    }
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}

