import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { MainService } from './main.service';
import { HttpModule } from '@angular/http';
import { TokenService } from '../core/token.service';
const routes: Routes = [
  //localhost4200:main
  {
    path: '', component: MainComponent, children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      //localhost:4200/main/index
      { path: 'index', loadChildren: './index/index.module#IndexModule' },
      //localhost:4200/main/profile
      { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
      //localhost:422/main/password
      {path: 'password', loadChildren:'./password/password.module#PasswordModule'},
      //localhost:4200/main/room
      { path: 'room', loadChildren: './room/room.module#RoomModule' },
      { path: 'staff', loadChildren: './staff/staff.module#StaffModule' },
      { path: 'position', loadChildren: './position/position.module#PositionModule' },
      
    ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpModule
  ],
  providers: [MainService, TokenService],
  declarations: [MainComponent]
})
export class MainModule { }
