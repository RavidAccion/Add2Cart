import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ApiService } from '../.././api.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  forLogin = true;
  UserId: any;
  login: any = FormGroup;
  registerform: any = FormGroup;
  userlist: any;
  invalidCredentials: any = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private formBuilder: FormBuilder,
    private Api: ApiService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.getUserdata();
    this.createForm();
    this.registerForm();
  }
  createForm() {
    this.login = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  registerForm() {
    this.registerform = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pin: ['', Validators.required],
      landmark: ['', Validators.required],
    });
  }
  getUserdata() {
    this.UserId = localStorage.getItem('UserId');
    this.Api.getUserData().subscribe((res) => {
      this.userlist = res;
      console.log(this.userlist);
    });
  }
  onSubmit() {
    // this.post = post;

    console.log(this.login.value);
    Object.keys(this.userlist).forEach((key) => {
      if (
        this.userlist[key].name === this.login.value.username &&
        this.userlist[key].password === this.login.value.password
      ) {
        localStorage.setItem('UserId', this.userlist[key].customer_id);
        localStorage.setItem('Username', this.userlist[key].name);
        localStorage.setItem('isLoggedIn', 'yes');
        this.invalidCredentials = false;
        this.dialogRef.close();
      } else if (
        this.userlist[key].name !== this.login.value.username ||
        this.userlist[key].password !== this.login.value.password
      ) {
        console.log('wrong Password');
        this.invalidCredentials = true;
      }
    });
  }
  registerdata() {
    console.log(this.registerform.value);
    var CustomerData = {
      customer_id: 0,
      email: this.registerform.value.email,
      password: this.registerform.value.password,
      name: this.registerform.value.name,
      state: this.registerform.value.state,
      city: this.registerform.value.city,
      landmark: this.registerform.value.landmark,
      phone: this.registerform.value.phone,
      pin: this.registerform.value.pin,
    };
    console.log(CustomerData);
    this.Api.createCustomer(CustomerData).subscribe((res) => {
      console.log('data response1', res);
    });
  }
  register() {
    this.forLogin = false;
  }
  tologin() {
    this.forLogin = true;
  }
}
