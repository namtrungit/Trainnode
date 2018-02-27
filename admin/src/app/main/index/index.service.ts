import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { CONFIG } from "../../core/app.config";
import { TokenService } from "../../core/token.service";
@Injectable()
export class IndexService {

  constructor(
    private _http: Http,
    private _tokenService: TokenService
  ) { }
  //Tạo header kèm token
  private createHeaders(): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this._tokenService.getToken(CONFIG.TOKEN));//Gửi lên server để nhận diện
    return headers;
  }

  getProfile() {
    return this._http.get(CONFIG.BASE_API + '/users/user', { headers: this.createHeaders() }).map(res => res.json());
  }
}
