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
  //method to get orders data from api
  getOrders() {
    var id = localStorage.getItem('UserId');
    this.Api.getOrderById(id).subscribe((res) => {
      this.OrdrList = res;
      console.log(this.OrdrList);
      if (this.OrdrList.length == 0) {
        this.noData = false;
      } else {
        this.noData = true;
      }
    });
  }
  //method to go to previous
  toPrevious() {
    this.location.back();
  }
}
