import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { Routes, RouterModule } from '@angular/router'
const routes: Routes = [
  {
    path: '', component: StaffComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', loadChildren: './list/list.module#ListModule' },//localhost:4200/main/staff/list
      { path: 'add', loadChildren: './add/add.module#AddModule' },//localhost:4200/main/staff/add

    ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StaffComponent]
})
export class StaffModule { }
