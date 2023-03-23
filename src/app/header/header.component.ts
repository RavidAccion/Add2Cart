import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('searchbar') searchbar!: ElementRef;
  searchText = '';

  toggleSearch: boolean = false;
  // constructor(private http: Http) { }

  constructor() {}

  openSearch() {
    // this.toggleSearch = true;
    // this.toggleSearch != this.toggleSearch;

    // this.searchbar.nativeElement.focus();
    debugger;
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
