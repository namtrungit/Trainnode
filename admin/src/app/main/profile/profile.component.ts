import { Component, OnInit } from '@angular/core';
import { ProfileService } from "./profile.service";

declare var toastr: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public id: number;
  public fullname: string = '';
  public email: string = '';
  public sex: string = '';
  public created: Date;
  constructor(
    private _profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.getProfile();
  }
  getProfile() {
    this._profileService.getProfile().subscribe(res => {
      //Trường hợp này có giá trị trả về từ server
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (res.status === 'success') {
        //Gán thông tin model
        this.id = res.user.user_id;
        this.fullname = res.user.user_fullname;
        this.email = res.user.user_email;
        this.sex = res.user.user_sex;
        this.created = res.user.createdAt;
      }
    }, error => {
      //Trường hợp  này xảy ra khi không kết nối được đến server
      toastr.error('Không kết nối được đến server');
    });
  }
  updateProfile() {
    // console.log(this.fullname);
    // console.log(this.email);
    // console.log(this.sex);
    var data: Object = JSON.stringify({
      user_id: this.id,
      user_fullname: this.fullname,
      //email : this.email,
      user_sex: this.sex
    });
    this._profileService.updateProfile(data).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      } else if (res.status === 'success') {
        console.log(res);
        toastr.success(res.message);
      }
    }, error => {
      toastr.error('Không kết nối được đến server');
      return;
    })
  }
}
