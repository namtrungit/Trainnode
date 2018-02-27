import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { CONFIG } from "../../core/app.config";
import { TokenService } from "../../core/token.service";
@Injectable()
export class PositionService {

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
  addPosition(data: Object) {
    return this._http.post(CONFIG.BASE_API + '/positions/add-position', data, { headers: this.createHeaders() }).map(res => res.json());
  }
  getPosition() {
    return this._http.get(CONFIG.BASE_API + '/positions/get-position', { headers: this.createHeaders() }).map(res => res.json());
  }
  delPosition(position_id) {
    return this._http.delete(CONFIG.BASE_API + '/positions/del-position?position_id=' + position_id, { headers: this.createHeaders() }).map(res => res.json());
  }
}
