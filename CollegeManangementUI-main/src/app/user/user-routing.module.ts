import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashAuthGuard } from '../guards/dash-auth.guard';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '', component: UserComponent, canActivate: [dashAuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'addcourse',
        loadChildren: () => import('./add-course/add-course.module').then(m => m.AddCourseModule)
      },
      {
        path: 'addsubject',
        loadChildren: () => import('./add-subject/add-subject.module').then(m => m.AddSubjectModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
