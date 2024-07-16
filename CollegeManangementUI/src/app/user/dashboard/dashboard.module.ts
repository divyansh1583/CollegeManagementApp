import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    ProfileComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatTableModule
  ],
  exports:[
    
  ]
})
export class DashboardModule { }
