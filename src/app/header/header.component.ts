import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '.././api.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('searchbar') searchbar!: ElementRef;
  searchText = '';
  CartLength: any;
  cartitems: any;
  toggleSearch: boolean = false;
  // constructor(private http: Http) { }

  constructor(public router: Router, private Api: ApiService) {}
  ngOnInit() {
    this.getCount();
  }
  openSearch() {
    // this.toggleSearch = true;
    // this.toggleSearch != this.toggleSearch;

    // this.searchbar.nativeElement.focus();

    if (this.toggleSearch == true) {
      this.toggleSearch = false;
    } else if (this.toggleSearch == false) {
      this.toggleSearch = true;
    }
    console.log(this.toggleSearch);
  }
  getCount() {
    var id = localStorage.getItem('UserId');
    this.Api.getCartDataById(id).subscribe((res) => {
      this.cartitems = res;
      this.CartLength = this.cartitems.length;
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
  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('UserId');
    this.router.navigate(['']);
  }
}
