import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit{
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;

  protected courses: Course[] = [];
  protected displayedColumns: string[] = ['id', 'name', 'duration', 'actions'];


  constructor(
    public dialog: MatDialog, 
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    const storedCourses = localStorage.getItem('storedCourses');
    this.courses = storedCourses ? JSON.parse(storedCourses) : [];
  }

  //add courses
  addEditCourse(course?: Course) {
    var dialogRef = this.dialog.open(CourseDialogComponent, {
      width: '350px',
      data: { 
        course: course ? 
        { ...course } : 
        { id: this.generateId(), name: '', duration: '' }, 
        courses: this.courses 
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  generateId(): number {
    return this.courses.length > 0 ? 
    Math.max(...this.courses.map(course => course.id)) + 1 : 
    1;
  }

  //delete courses
  deleteCourse(courseId: number) {
    var dialogRef = this.dialog.open(this.deleteDialog!);
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.courses = this.courses.filter(c => c.id !== courseId);
          localStorage.setItem('storedCourses', JSON.stringify(this.courses));
          this.toastr.success("Course Delete successfully");
        }
      }
    );

  }

}

