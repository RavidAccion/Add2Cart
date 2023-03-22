import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() name!: string;

  isOpen = false;
  isDropdownOpen = false;
  // constructor(private http: Http) { }

  ngOnInit() {
    this.getData();
  }

  toggleNavbar() {
    this.isOpen = !this.isOpen;
  }

  toggleDropDown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  getData() {
    // this.http.get('https://jsonplaceholder.typicode.com/posts').map(res => res.json()).subscribe(res => {
    //   console.log(res);
    // });
  }
}
