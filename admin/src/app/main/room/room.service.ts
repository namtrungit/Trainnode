import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { CONFIG } from "../../core/app.config";
import { TokenService } from "../../core/token.service";
@Injectable()
export class RoomService {

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
  addRoom(data: Object) {
    return this._http.post(CONFIG.BASE_API + '/rooms/add-room', data, { headers: this.createHeaders() }).map(res => res.json());
  }
  getRoom() {
    return this._http.get(CONFIG.BASE_API + '/rooms/get-room', { headers: this.createHeaders() }).map(res => res.json());
  }

  delRoom(room_id) {
    return this._http.delete(CONFIG.BASE_API + '/rooms/del-room?room_id=' + room_id, { headers: this.createHeaders() }).map(res => res.json());
  }
}
