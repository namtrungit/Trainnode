import { Injectable } from '@angular/core';
import { TokenService } from '../../../core/token.service';
import { CONFIG } from '../../../core/app.config';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class AddService {

  constructor(
    private _http: Http,
    private _tokenService: TokenService
  ) { }
  private createHeaders(): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this._tokenService.getToken(CONFIG.TOKEN));//Gửi lên server để nhận diện
    return headers;
  }
  getRoom() {
    return this._http.get(CONFIG.BASE_API + '/rooms/get-room', { headers: this.createHeaders() }).map(res => res.json());
  }
  getPosition() {
    return this._http.get(CONFIG.BASE_API + '/positions/get-position', { headers: this.createHeaders() }).map(res => res.json());
  }
  addStaff(staff: Object) {
    return this._http.post(CONFIG.BASE_API + '/staffs/add-staff', staff, { headers: this.createHeaders() }).map(res => res.json());
  }

  tokenError() {
    this._tokenService.tokenError();
  }
}
