import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent {
  OrdrList: any;
  noData: boolean = true;
  constructor(public location: Location, private Api: ApiService) {}

  ngOnInit() {
    this.getOrders();
  }
  getOrders() {
    var id = localStorage.getItem('UserId');
    this.Api.getOrderById(id).subscribe((res) => {
      debugger;
      this.OrdrList = res;
      if (this.OrdrList.length == 0) {
        this.noData = false;
      } else {
        this.noData = true;
      }
    });
  }

  toPrevious() {
    this.location.back();
  }
}
