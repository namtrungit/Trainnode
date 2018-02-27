import { Component, OnInit } from '@angular/core';
import { RoomService } from './room.service';
import { error } from 'selenium-webdriver';
declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  public room_name: string = '';
  public list_room: Array<any> = [];
  constructor(
    private _roomService: RoomService
  ) { }

  ngOnInit() {
    this.getRoom();
  }
  addRoom() {
    if (this.room_name === '') {
      toastr.warning('Bạn chưa nhập tên phòng');
      $('#room-name').focus();
      return;
    }
    var data = JSON.stringify({
      room_name: this.room_name
    });
    this._roomService.addRoom(data).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      } else if (res.status === 'success') {
        toastr.success(res.message);
        $('#room-name').val('');
        this.room_name = '';
        this.getRoom();
        return;
      }
    }, err => {
      toastr.error('Không kết nối được đến server');
      return;
    });
  }
  getRoom() {
    this._roomService.getRoom().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      } else if (res.status === 'success') {
        this.list_room = res.rooms
      }
    }, err => {
      toastr.error('Không kết nối được đến server');
      return;
    });
  }
  delRoom(room_id){
    this._roomService.delRoom(room_id).subscribe(res=>{
      if(res.status === 'error'){
        toastr.error(res.message);
        return;
      }
      else if(res.status === 'success'){
        toastr.success(res.message);
        this.getRoom();
        return;
      }
    },error=>{
      toastr.error('Không kết nối được đến server');
      return;
    })
  }
}
