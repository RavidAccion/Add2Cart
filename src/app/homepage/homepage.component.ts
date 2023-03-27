import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../Dialog/login/login.component';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  firstTime: any;
  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit() {
    this.openDialog();
  }
  toProduct() {
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
