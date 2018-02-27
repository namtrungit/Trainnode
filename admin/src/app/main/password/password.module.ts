import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './password.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {PasswordService} from './password.service'
const routes: Routes = [
  { path: '', component: PasswordComponent }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ],
  providers:[PasswordService],
  declarations: [PasswordComponent]
})
export class PasswordModule { }
