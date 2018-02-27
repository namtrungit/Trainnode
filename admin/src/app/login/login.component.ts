import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { TokenService } from '../core/token.service';
import { Router } from '@angular/router';
import { CONFIG } from '../core/app.config'
declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string = '';
  public password: string = '';
  constructor(
    private _loginService: LoginService,
    private _tokenService: TokenService,
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  login() {
    if (this.email === '') {
      toastr.warning('Bạn chưa nhập email', 'Thông báo');
      $('#email').focus();
      return;
    }
    var email = this.email, atpos = email.indexOf("@"), dotpos = email.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
      toastr.warning('Email không hợp lệ', 'Thông báo');
      return;
    }
    if (this.password === '') {
      toastr.warning('Bạn chưa nhập mật khẩu', 'Thông báo');
      $('#password').focus();
      return;
    }
    this._loginService.login(this.email, this.password).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message)
      } else if (res.status === 'success') {
        this._tokenService.setToken(CONFIG.TOKEN, res.token);
        toastr.success(res.message);
        this._router.navigate(['main/index']);
      }
    }, error => {
      console.log('Khong the ket noi den server');
    });
  }

}
