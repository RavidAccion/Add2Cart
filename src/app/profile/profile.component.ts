import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  UserId: any;
  Data: any;
  profileOptions = [
    { option: 'My Orders' },
    { option: 'Address' },
    { option: 'Carts' },
    { ption: 'Payment Options' },
  ];
  constructor(public location: Location, private Api: ApiService) {}
  ngOnInit() {
    this.getData();
  }
  toPrevious() {
    this.location.back();
  }
  getData() {
    var id = localStorage.getItem('UserId');
    this.Api.getUserDataById(id).subscribe((res) => {
      this.Data = res;
      console.log(this.Data);
    });
  }
}
