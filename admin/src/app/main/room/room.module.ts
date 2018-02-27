import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from './room.component';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {RoomService} from"./room.service"
const routes: Routes = [
  { path: '', component: RoomComponent }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [RoomService],
  declarations: [RoomComponent]
})
export class RoomModule { }
