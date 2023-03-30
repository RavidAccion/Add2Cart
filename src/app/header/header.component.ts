import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('searchbar') searchbar!: ElementRef;
  searchText = '';
  CartLength: any;

  toggleSearch: boolean = false;
  // constructor(private http: Http) { }

  constructor() {}
  ngOnInit() {
    this.CartLength = localStorage.getItem('CartLength');
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
  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
    console.log(this.toggleSearch);
  }
}
