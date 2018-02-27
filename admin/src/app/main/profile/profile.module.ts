import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import {ProfileService} from "./profile.service";
import {FormsModule} from "@angular/forms"
const routes: Routes = [
  { path: '', component: ProfileComponent }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers:[ProfileService],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
