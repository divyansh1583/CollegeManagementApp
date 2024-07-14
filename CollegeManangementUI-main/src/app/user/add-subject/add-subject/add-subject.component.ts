import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { SubjectDialogComponent } from '../subject-dialog/subject-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'src/app/models/subject.model';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent {
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;

  protected subjects: Subject[] = [];
  protected displayedColumns: string[] = ['id', 'subject','course', 'semester','marks', 'actions'];
  protected courses: Course[] = [];
  courseNames: { [courseName: string]: number } = {};
  constructor(
    public dialog: MatDialog, 
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadsubjects();
  }

  loadsubjects() {
    const storedsubjects = localStorage.getItem('storedsubjects');
    this.subjects = storedsubjects ? JSON.parse(storedsubjects) : [];

    const storedCourses = localStorage.getItem('storedCourses');
    this.courses = storedCourses ? JSON.parse(storedCourses) : [];
    this.courses.forEach(course => {
      this.courseNames[course.name] = course.id;
    });
  }
  findCourseName(courseId: number): string {
    const foundCourses = this.courses.filter(course => course.id === courseId);
    return foundCourses.length > 0 ? foundCourses[0].name : 'Course not found';
  }
  //add subjects
  addEditsubject(subject?: Subject) {
    var dialogRef = this.dialog.open(SubjectDialogComponent, {
      // width: '350px',
      data: { 
        subject: subject ? 
        { ...subject } : 
        { id: this.generateId(), name: '', courseId: null,semester:'',marks:0}, 
        subjects: this.subjects,
        courses:this.courses 
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.cdr.markForCheck();
      if (result) {
      if(subject) this.toastr.success('Subject updated successfully');
      else this.toastr.success('Subject added successfully');
      }
    });
  }

  generateId(): number {
    return this.subjects.length > 0 ? 
    Math.max(...this.subjects.map(subject => subject.id)) + 1 : 
    1;
  }

  //delete subjects
  deletesubject(subjectId: number) {
    var dialogRef = this.dialog.open(this.deleteDialog!);
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.subjects = this.subjects.filter(c => c.id !== subjectId);
          localStorage.setItem('storedsubjects', JSON.stringify(this.subjects));
          this.toastr.success("Subject Delete successfully");
        }
      }
    );

  }
}
