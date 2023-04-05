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
import { LoginComponent } from '../Dialog/login/login.component';
@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.scss'],
})
export class ProductpageComponent {
  firstTime: any;
  categorylist: any;
  categoryID: any;
  productlist: any;
  nodataToDisplay: any;
  totalPrice: any;
  cartdata: any = [];
  notLoggedIn: any;
  cartitems: any = [];
  productLength: any;
  noData: any;
  noUser: boolean = false;
  UserId: any;
  constructor(
    public router: Router,
    public location: Location,
    private Api: ApiService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.getIdFromSession();
    this.checkUserId();
    this.getData();
    this.notLoggedIncart();
    this.getCartData();
  }
  toPrevious() {
    this.location.back();
  }

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

  getCartData() {
    var id = this.UserId;
    this.Api.getCartDataById(id).subscribe((res) => {
      this.cartitems = res;
      console.log(this.cartitems);

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
        console.log(this.totalPrice);
        localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
      });
    });
  }

  /* Method to get the ID from the session to get the category of the products */
  getIdFromSession() {
    this.UserId = localStorage.getItem('UserId');
    this.firstTime = localStorage.getItem('isLoggedIn'); //to check weather the user is logged in
    this.categoryID = localStorage.getItem('ID');
    console.log(this.categoryID);
  }
  checkUserId() {
    if (this.UserId == null) {
      this.noUser = true;
      console.log(this.noUser);
    }
  }
  notLoggedIncart() {
    if (this.firstTime == null) {
      this.notLoggedIn = true;
    }
  }
  getbycategory(id: any) {
    console.log(id);
    localStorage.setItem('ID', id.id);
    this.ngOnInit();
  }
  // deleteCartItems(data: any) {
  //   const deldata = [...this.cartitems];
  //   const index = deldata.findIndex((x) => x.id === data.id);
  //   this.cartitems.splice(index, 1);
  //   this.cartitems = [...this.cartitems];
  //   localStorage.setItem('cartData', JSON.stringify(this.cartitems));
  //   // localStorage.setItem('Data', JSON.stringify(this.tableData));
  //   this.getCartData();
  // }
  addToCart(item: any) {
    if (this.firstTime == null) {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '600px',
        height: '430px',
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
        this.noUser = false;
        this.ngOnInit();
      });

      console.log(this.firstTime);
    } else {
      console.log(item);
      var data = {
        id: 0,
        customer_id: JSON.parse(this.UserId),
        product_name: item.product_name,
        product_id: item.id,
        price: item.price,
        product_description: item.product_description,
        category: item.category,
        product_stock: item.stock,
      };
      console.log(data);
      this.Api.postCartdatas(data).subscribe((res) => {
        console.log('data response1', res);
        this.cartitems = res;
        this.getCartData();
      });
      console.log('already logged in', data);
    }
  }
  deleteCartItems(data: any) {
    console.log(data.id);
    var id = data.id;
    this.Api.deleteCartItem(id).subscribe();
    debugger;
    this.getCartData();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CheckoutComponent, {
      disableClose: true,
      width: '600px',
      height: '470px',
      data: this.cartitems,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
