import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.scss'],
})
export class ProductpageComponent {
  categorylist: any;
  categoryID: any;
  productlist: any;
  cartdata: any = [];
  cartitems: any = [];
  constructor(
    public router: Router,
    public location: Location,
    private Api: ApiService
  ) {}
  ngOnInit() {
    this.getIdFromSession();
    this.getData();
  }
  toPrevious() {
    this.location.back();
  }

  sampleSuggestionsArray = [
    {
      id: '1',
      menuName: 'Item 1',
      variationCost: '20.50',
      desc: 'Lorem ipsum dolor sit amet..',
      qtyTotal: 0,
    },
    {
      id: '2',
      menuName: 'Item 2',
      variationCost: '10',
      desc: 'Lorem ipsum dolor sit amet..',
      qtyTotal: 0,
    },
    {
      id: '3',
      menuName: 'Item 3',
      variationCost: '5.50',
      desc: 'Lorem ipsum dolor sit amet..',
      qtyTotal: 0,
    },
  ];

  getData() {
    this.Api.getCategoryData().subscribe((res) => {
      this.categorylist = res;
      console.log(this.categorylist);
    });
    var Id = this.categoryID;
    this.Api.getProductsByCategory(Id).subscribe((res) => {
      this.productlist = res;
      console.log(res);
    });
  }
  cartData(data: any) {
    console.log(data);
    this.cartdata = [...this.cartdata, data];
    sessionStorage.setItem('cartData', JSON.stringify(this.cartdata));
    this.cartitems = sessionStorage.getItem('cartData');
  }
  getIdFromSession() {
    this.categoryID = sessionStorage.getItem('ID');
  }
  addTocart() {}
}
