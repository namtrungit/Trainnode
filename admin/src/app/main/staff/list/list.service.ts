import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../../core/token.service';
import { CONFIG } from '../../../core/app.config';
@Injectable()
export class ListService {
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
  tokenError() {
    this._tokenService.tokenError();
  }
  getStaffs() {
    return this._http.get(CONFIG.BASE_API + "/staffs/list-staff", { headers: this.createHeaders() }).map(res => res.json());
  }
  getRoom() {
    return this._http.get(CONFIG.BASE_API + '/rooms/get-room', { headers: this.createHeaders() }).map(res => res.json());
  }
  getPosition() {
    return this._http.get(CONFIG.BASE_API + '/positions/get-position', { headers: this.createHeaders() }).map(res => res.json());
  }
  delStaff(staff_id) {
    return this._http.delete(CONFIG.BASE_API + '/staffs/del-staff?staff_id=' + staff_id, { headers: this.createHeaders() }).map(res => res.json());
  }
  updateStaff(staff: Object) {
    return this._http.put(CONFIG.BASE_API + '/staffs/update-staff', staff, { headers: this.createHeaders() }).map(res => res.json());
  }
}
