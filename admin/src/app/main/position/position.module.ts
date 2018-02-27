import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionComponent } from './position.component';
import { Routes, RouterModule } from '@angular/router';
import { PositionService } from './position.service';
import { FormsModule } from '@angular/forms'
const routes: Routes = [
  { path: '', component: PositionComponent }
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [PositionService],
  declarations: [PositionComponent]
})
export class PositionModule { }
