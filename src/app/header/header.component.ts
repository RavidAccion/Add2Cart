import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '.././api.service';
import { Subscription } from 'rxjs';
import { ProductpageComponent } from '../productpage/productpage.component';
import { LoginComponent } from '../Dialog/login/login.component';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild(ProductpageComponent)
  Component!: ProductpageComponent;
  @ViewChild('searchbar') searchbar!: ElementRef;
  searchText = '';
  firstTime: any;
  login: any;
  CartLength: any;
  cartitems: any;
  sharedData: any;
  Name: any;
  userType: any;
  userName: any;
  toggleSearch: boolean = false;
  subscriptionName: any = Subscription;
  // constructor(private http: Http) { }

  constructor(
    public router: Router,
    private Api: ApiService,
    public dialog: MatDialog
  ) {}
  ngOnInit() {
    this.getCount();
  }
  openSearch() {
    if (this.toggleSearch == true) {
      this.toggleSearch = false;
    } else if (this.toggleSearch == false) {
      this.toggleSearch = true;
    }
    console.log(this.toggleSearch);
  }
  getCount() {
    this.firstTime = localStorage.getItem('isLoggedIn');
    this.userType = localStorage.getItem('UserType');
    if (this.firstTime == null) {
      this.login = true;
    } else {
      this.login = false;
    }
    var id = localStorage.getItem('UserId');
    this.Api.getUserDataById(id).subscribe((res) => {
      this.Name = res;
      this.userName = this.Name[0].name;
    });
    this.Api.getCartDataById(id).subscribe((res) => {
      this.cartitems = res;
      this.CartLength = this.cartitems.length;
    });
  }
  logIn() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '600px',
      height: '430px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.login = false;
      this.ngOnInit();
    });
  }

  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
    console.log(this.toggleSearch);
  }
  goToOrders() {
    this.router.navigate(['orders']);
  }
  goToProfile() {
    this.router.navigate(['profile']);
  }
  goToDashboard() {
    this.router.navigate(['admin']);
  }
  goToHome() {
    this.router.navigate(['']);
  }
  logout() {
    this.login = true;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('UserId');
    this.router.navigate(['']);
  }
}
