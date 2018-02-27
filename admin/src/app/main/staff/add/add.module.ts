import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {AddService} from './add.service'
const routes: Routes = [
  { path: '', component: AddComponent }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  providers:[AddService],
  declarations: [AddComponent]
})
export class AddModule { }
