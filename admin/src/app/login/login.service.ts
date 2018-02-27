import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http'; // 3 gói bắt buộc
import 'rxjs/add/operator/map'; // gói dùng để map dữ liệu
import { CONFIG } from "../core/app.config"; // gói liên kết server
@Injectable()
export class LoginService {

  constructor(
    private _http: Http
  ) { }

  private createHeaders(): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  login(email: string, password: string) {
    return this._http.post(CONFIG.BASE_API + '/users/login', JSON.stringify({
      user_email: email,
      user_password: password
    }), { headers: this.createHeaders() }).map(res => res.json());
  }
}
