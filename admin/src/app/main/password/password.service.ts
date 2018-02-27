import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { CONFIG } from "../../core/app.config";
import { TokenService } from "../../core/token.service";
import { Http, Headers } from '@angular/http';
@Injectable()
export class PasswordService {

  constructor(
    private _tokenService: TokenService,
    private _http: Http
  ) { }
  private createHeaders(): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this._tokenService.getToken(CONFIG.TOKEN));//Gửi lên server để nhận diện
    return headers;
  }
  getProfile() {
    return this._http.get(CONFIG.BASE_API + '/users/user', { headers: this.createHeaders() }).map(res => res.json());
  }
  updatePassword(pass: Object) {
    return this._http.put(CONFIG.BASE_API + '/users/update-password', pass, { headers: this.createHeaders() }).map(res => res.json());
  }
}
