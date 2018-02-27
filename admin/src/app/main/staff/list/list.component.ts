import { Component, OnInit } from '@angular/core';
import { CONFIG } from "../../../core/app.config";
import { ListService } from "./list.service";
// import { TokenService } from '../../../core/token.service';
// import 'rxjs/add/operator/map';
// import { Http, Headers } from '@angular/http';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public list_staffs: Array<any> = [];
  public select_staff: Object = {};
  public folder_avatar: string = CONFIG.BASE_API + '/uploads/avatar/';
  public staff_avatar: string = '';
  public staff_name: string = '';
  public staff_phone: string = '';
  public staff_email: string = '';
  public staff_birthday: string = '';
  public staff_sex: string;
  public staff_address: string = '';
  public staff_position: number;
  public staff_room: number;
  public staff_id: number;
  constructor(
    private _listService: ListService,
    // private _tokenService: TokenService,
    // private _http: Http,
  ) { }
  // private createHeaders(): any {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('token', this._tokenService.getToken(CONFIG.TOKEN));//Gửi lên server để nhận diện
  //   return headers;
  // }
  public list_position: Array<any> = [];
  public list_room: Array<any> = [];
  ngOnInit() {
    this.getStaffs();
    this.getPosition();
    this.getRoom();
    $('#staff-birthday').datetimepicker({
      format: 'DD/MM/YYYY'
    });
  }
  getPosition() {
    this._listService.getPosition().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listService.tokenError();
      } if (res.status === 'success') {
        this.list_position = res.positions;
        //console.log(res);
      }
    }, error => {
      toastr.error('Không kết nối được đến server');
      return;
    });
  }
  getRoom() {
    this._listService.getRoom().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listService.tokenError();
      }
      if (res.status === 'success') {
        this.list_room = res.rooms;
        //console.log(res);
      }
    }, error => {
      toastr.error('Không kết nối được đến server');
      return;
    });
  }
  uploadAvatar(e) {
    var formData = new FormData();
    formData.append('avatar', e.target.files["0"]);
    $.ajax({
      url: CONFIG.BASE_API + '/staffs/upload-avatar',
      type: 'POST',
      // http: Http,
      // headers: {
      //   'token': this._tokenService.getToken(CONFIG.TOKEN),
      //   'Content-Type': 'application/json'
      // },
      data: formData,
      processData: false,
      contentType: false,
      // dataType: 'json',
      success: (data) => {
        if (data.status === 'success') {
          toastr.success(data.message);
          this.staff_avatar = data.avatar;
          console.log(data);
          return;
        }
        if (data.status === 'error') {
          console.log(data);
        }
      }
    });
  }
  getStaffs() {
    this._listService.getStaffs().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listService.tokenError();
      }
      if (res.status === 'success') {
        this.list_staffs = res.staffs
        //console.log(this.list_staffs);
      }
    }, error => {

    });
  }
  selectStaff(staff) {
    // this.select_staff = staff;
    //
    this.staff_id = staff.staff_id;
    this.staff_avatar = staff.staff_avatar;
    this.staff_name = staff.staff_fullname;
    this.staff_phone = staff.staff_phone;
    this.staff_email = staff.staff_email;
    this.staff_address = staff.staff_address;
    this.staff_sex = staff.staff_sex;
    this.staff_position = staff.position_id;
    this.staff_room = staff.room_id;
    $('#staff-birthday').val(staff.staff_birthday);
    // console.log(this.staff_id);
  }
  delStaff(staff_id) {
    staff_id = this.staff_id
    this._listService.delStaff(this.staff_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getStaffs();
        return;
      }
    }, error => {
      toastr.error('Không kết nối được đến server');
      return;
    })
  }
  updateStaff() {
    var staff: Object = JSON.stringify({
      staff_id: this.staff_id,
      staff_room_id: this.staff_room,
      staff_position_id: this.staff_position,
      staff_fullname: this.staff_name,
      staff_birthday:$('#staff-birthday').val(),
      staff_address: this.staff_address,
      staff_phone: this.staff_phone,
      staff_email: this.staff_email,
      staff_sex: this.staff_sex,
      staff_avatar: this.staff_avatar,
    });
    console.log(staff);
    this._listService.updateStaff(staff).subscribe(res => {
      if(res.status === 'error'){
        toastr.error(res.message);
        return;
      }
      if(res.status === 'success'){
        toastr.success(res.message);
        this.getStaffs();
        return;
      }
    },error =>{
      toastr.error('Không kết nối được đến server');
      return;
    })
  }
}
