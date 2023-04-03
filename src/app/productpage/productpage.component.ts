import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../api.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { CheckoutComponent } from '../Dialog/checkout/checkout.component';
@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.scss'],
})
export class ProductpageComponent {
  categorylist: any;
  categoryID: any;
  productlist: any;
  nodataToDisplay: any;
  totalPrice: any;
  cartdata: any = [];
  cartitems: any = [];
  productLength: any;
  noData: any;
  constructor(
    public router: Router,
    public location: Location,
    private Api: ApiService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.getIdFromSession();
    this.getData();
    this.cartDataLength();
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

  /* Method to get the datas from Api */
  getData() {
    this.Api.getCategoryData().subscribe((res) => {
      this.categorylist = res;
    });

    var Id = this.categoryID;
    if (this.categoryID == 0) {
      this.Api.getProductData().subscribe((res) => {
        this.productlist = res;
        this.productLength = this.productlist.length;
        console.log(this.productLength);
        if (this.productlist.length == 0) {
          this.nodataToDisplay = true;
        } else {
          this.nodataToDisplay = false;
        }
      });
    } else {
      this.Api.getProductsByCategory(Id).subscribe((res) => {
        this.productlist = res;
        this.productLength = this.productlist.length;
        console.log(this.productLength);
        if (this.productlist.length == 0) {
          this.nodataToDisplay = true;
        } else {
          this.nodataToDisplay = false;
        }
      });
    }

    console.log(this.nodataToDisplay);
  }

  /* Method to add datas that are selected to the cart */
  cartData(data: any) {
    //this.cartdata = [...this.cartdata, data];
    //dont delete
    this.cartdata = [...this.cartitems, data];
    localStorage.setItem('cartData', JSON.stringify(this.cartdata));
    this.getCartData();
    // this.cartitems = sessionStorage.getItem('cartData');
  }
  getCartData() {
    const _data = localStorage.getItem('cartData');
    this.cartitems = JSON.parse(_data || '{}');
    this.cartDataLength();
    console.log(this.cartitems);
  }
  cartDataLength() {
    const _data = localStorage.getItem('cartData');
    this.cartitems = JSON.parse(_data || '{}');
    localStorage.setItem('CartLength', this.cartitems.length);
    if (this.cartitems.length == 0) {
      this.noData = true;
    } else {
      this.noData = false;
    }

    //calculating total
    var sum = 0;
    this.cartitems.forEach((data: any) => {
      var total = data.price;
      sum += total;
      this.totalPrice = sum;
      localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
    });
  }

  /* Method to get the ID from the session to get the category of the products */
  getIdFromSession() {
    this.categoryID = localStorage.getItem('ID');
    console.log(this.categoryID);
  }
  getbycategory(id: any) {
    console.log(id);
    localStorage.setItem('ID', id.id);
    this.ngOnInit();
  }
  deleteCartItems(data: any) {
    const deldata = [...this.cartitems];
    const index = deldata.findIndex((x) => x.id === data.id);
    this.cartitems.splice(index, 1);
    this.cartitems = [...this.cartitems];
    localStorage.setItem('cartData', JSON.stringify(this.cartitems));
    // localStorage.setItem('Data', JSON.stringify(this.tableData));
    this.getCartData();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CheckoutComponent, {
      disableClose: true,
      width: '600px',
      height: '600px',
      data: this.cartitems,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
