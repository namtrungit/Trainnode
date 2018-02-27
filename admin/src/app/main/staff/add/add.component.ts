import { Component, OnInit } from '@angular/core';
import { CONFIG } from "../../../core/app.config";
import { AddService } from './add.service';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
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
  constructor(
    private _addService: AddService,
  ) { }

  public list_position: Array<any> = [];
  public list_room: Array<any> = [];
  ngOnInit() {
    this.getPosition();
    this.getRoom();
    $('#staff-birthday').datetimepicker({
      format: 'DD/MM/YYYY'
    });
  }

  uploadAvatar(e) {
    var formData = new FormData();
    formData.append('avatar', e.target.files["0"]);
    $.ajax({
      url: CONFIG.BASE_API + '/staffs/upload-avatar',
      type: 'POST',
      data: formData,
      processData: false,  // tell jQuery not to process the data
      contentType: false,  // tell jQuery not to set contentType
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
  getPosition() {
    this._addService.getPosition().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addService.tokenError();
      } if (res.status === 'success') {
        this.list_position = res.positions;
        console.log(res);
      }
    }, error => {
      toastr.error('Không kết nối được đến server');
      return;
    });
  }
  getRoom() {
    this._addService.getRoom().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addService.tokenError();
      }
      if (res.status === 'success') {
        this.list_room = res.rooms;
        console.log(res);
      }
    }, error => {
      toastr.error('Không kết nối được đến server');
      return;
    });
  }
  addStaff() {
    //validated
    if (this.staff_name === "") {
      toastr.warning('Bạn chưa nhập tên nhân viên');
      $('#staff-name').focus();
      return;
    }
    if (this.staff_phone === "") {
      toastr.warning('Bạn chưa nhập số điện thoại');
      $('#staff-phone').focus();
      return;
    }
    if (this.staff_email === "") {
      toastr.warning('Bạn chưa nhập số email');
      $('#staff-email').focus();
      return;
    }
    if (this.staff_address === "") {
      toastr.warning('Bạn chưa nhập địa chỉ');
      $('#staff-address').focus();
      return;
    }
    var email = this.staff_email, atpos = email.indexOf("@"), dotpos = email.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
      toastr.warning('Email không hợp lệ', 'Thông báo');
      $('#staff-address').focus();
      return;
    }
    if ($('#staff-birthday').val() === "") {
      toastr.warning('Bạn chưa nhập ngày sinh');
      $('#staff-birthday').focus();
      return;
    }
    if (this.staff_sex === undefined) {
      toastr.warning('Bạn chọn giới tính ');
      $('#staff-sex').focus();
      return;
    }
    if (this.staff_position === undefined) {
      toastr.warning('Bạn chưa chọn chức vụ ');
      $('#staff-position').focus();
      return;
    }
    if (this.staff_room === undefined) {
      toastr.warning('Bạn chưa chọn phòng ');
      $('#staff-room').focus();
      return;
    }
    var staff = JSON.stringify({
      staff_room_id: this.staff_room,
      staff_position_id: this.staff_position,
      staff_fullname: this.staff_name,
      staff_birthday: $('#staff-birthday').val(),//Lấy dữ liệu từ id trên html, dữ liệu lấy dc là dạng chuỗi ko phải date
      staff_address: this.staff_address,
      staff_phone: this.staff_phone,
      staff_email: this.staff_email,
      staff_avatar: this.staff_avatar,
      staff_sex: this.staff_sex,
    });
    //console.log(staff);
    this._addService.addStaff(staff).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addService.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.staff_room = undefined;
        this.staff_position = undefined;
        this.staff_name = "";
        $('#staff-birthday').val("");
        this.staff_address = "";
        this.staff_phone = "";
        this.staff_email = "";
        this.staff_avatar = "";
        this.staff_sex = undefined;
        return;
      }
    }, error => {
      if (error) {
        toastr.error('Không kết nối được đến server');
        return;
      }
    })
  }
}
