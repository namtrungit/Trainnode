import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { Router } from '@angular/router';
import { CONFIG } from './app.config';
@Injectable()
export class TokenService {

  constructor(
    private _router: Router
  ) { }

  //Luu token vao trinh duyet
  setToken(name: string, value: string, expires?: number | Date): void {
    Cookie.set(name, value, expires);
  }

  //Lay token tu trinh duyet
  getToken(name: string): string {
    return Cookie.get(name);
  }

  //Kiem tra token
  checkToken(name: string): boolean {
    return Cookie.check(name);
  }

  //Xoa token
  deleteToken(name: string): void {
    Cookie.delete(name);
  }

  //Loi token
  tokenError(): void {
    Cookie.delete(CONFIG.TOKEN);
    this._router.navigate(['login']);//Khi token lỗi đẩy về trang login
  }
}