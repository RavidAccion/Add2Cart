import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../Dialog/login/login.component';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  categorylist: any;
  firstTime: any;
  options = { fullWidth: false };
  items = [
    'https://picsum.photos/200/300?image=0',
    'https://picsum.photos/200/300?image=1',
    'https://picsum.photos/200/300?image=2',
    'https://picsum.photos/200/300?image=3',
    'https://picsum.photos/200/300?image=4',
  ];

  hrefs = ['one', 'two', 'three', 'four', 'five'];
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private Api: ApiService
  ) {}

  ngOnInit() {
    this.openDialog();
    this.getCategory();
  }

  ngAfterViewInit() {
    // no errors
    let elems = document.querySelectorAll('.carousel');
  }

  getCategory() {
    this.Api.getCategoryData().subscribe((res) => {
      this.categorylist = res;
      console.log(this.categorylist);
    });
  }

  toProduct(id: any) {
    console.log(id);
    sessionStorage.setItem('ID', id.id);
    this.router.navigate(['/product']);
  }

  openDialog() {
    this.firstTime = sessionStorage.getItem('Token');
    // if (this.firstTime != 'yes') {
    //   console.log('yes');
    //   console.log(this.firstTime);
    // }
    if (this.firstTime == null) {
      const dialogRef = this.dialog.open(LoginComponent);
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
      console.log(this.firstTime);
    }
    sessionStorage.setItem('Token', 'yes');
  }
}
