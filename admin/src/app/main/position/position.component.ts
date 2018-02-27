import { Component, OnInit } from '@angular/core';
import { PositionService } from './position.service';
declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  public position_name: string = '';
  public list_position: Array<any> = [];
  constructor(
    private _positionService: PositionService
  ) { }

  ngOnInit() {
    this.getPosition();
  }
  addPosition() {
    if (this.position_name === '') {
      toastr.warning('Bạn chưa nhập tên vị trí');
      $('#position-name').focus();
      return;
    }
    var data = JSON.stringify({
      position_name: this.position_name
    });
    this._positionService.addPosition(data).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      } else if (res.status === 'success') {
        toastr.success(res.message);
        $('#position-name').val('');
        this.position_name = '';
        this.getPosition();
        return;
      }
    }, err => {
      toastr.error('Không kết nối được đến server');
      return;
    });
  }

  getPosition() {
    this._positionService.getPosition().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      } else if (res.status === 'success') {
        this.list_position = res.positions
      }
    }, err => {
      toastr.err('Không kết nối được đến server');
      return;
    });
  }

  delPosition(position_id){
    this._positionService.delPosition(position_id).subscribe(res=>{
      if(res.status === 'error'){
        toastr.error(res.message);
        return;
      }
      else if(res.status === 'success'){
        toastr.success(res.message);
        this.getPosition();
        return;
      }
    },error=>{
      toastr.error('Không kết nối được đến server');
      return;
    })
  }
}
