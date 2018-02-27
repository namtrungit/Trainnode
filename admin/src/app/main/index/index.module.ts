import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { Routes, RouterModule } from '@angular/router';
import { IndexService } from './index.service';
import { HttpModule } from '@angular/http';
import {TokenService} from '../../core/token.service'
const routes: Routes = [
  { path: '', component: IndexComponent } //localhost:4200/main/index
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule
  ],
  providers: [IndexService,TokenService],
  declarations: [IndexComponent]
})
export class IndexModule { }
