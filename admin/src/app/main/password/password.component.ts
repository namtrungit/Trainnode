import { Component, OnInit } from '@angular/core';
import{PasswordService} from './password.service';
declare var toastr:any;
declare var $:any;
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  public id: number;
  public old_password: string ="";
  public new_password: string ="";
  public new_password2: string ="";
  constructor(
    private _passwordService:PasswordService
  ) { }

  ngOnInit() {
    this.getProfile();
  }
  getProfile() {
    this._passwordService.getProfile().subscribe(res => {
      //Trường hợp này có giá trị trả về từ server
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (res.status === 'success') {
        //Gán thông tin model
        this.id = res.user.user_id;
      }
    }, error => {
      //Trường hợp  này xảy ra khi không kết nối được đến server
      toastr.error('Không kết nối được đến server');
    });
  }
  updatePassword(){
    //validate
    if(this.old_password === ''){
      toastr.warning('Bạn chưa nhập mật khẩu cũ');
      $('#old-password').focus();
      return;
    }
    if(this.new_password === ''){
      toastr.warning('Bạn chưa nhập mật khẩu mới');
      $('#new-password').focus();
      return;
    }
    if(this.new_password2 === ''){
      toastr.warning('Bạn chưa nhập mật khẩu mới');
      $('#new-password2').focus();
      return;
    }
    if(this.new_password != this.new_password2){
      toastr.warning('Mật khẩu mới xác nhận bạn nhập không chính xác');
      $('#new-password2').focus();
      return;
    }
    var pass: Object ={
      user_id: this.id,
      old_password: this.old_password,
      new_password: this.new_password
    };
    this._passwordService.updatePassword(pass).subscribe(res=>{
      if(res.status === 'error'){
        toastr.error(res.message);
        return;
      }
      if(res.status === 'success'){
        toastr.success(res.message);
        $('#old-password').val('');
        $('#new-password').val('');
        $('#new-password2').val('');
        this.old_password= '';
        this.new_password= '';
        this.new_password2= '';
        return;
      }
    },error=>{
      toastr.error('Không kết nối được đến server');
      return;
    });
  }
}
