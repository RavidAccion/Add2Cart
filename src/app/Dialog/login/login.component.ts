import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ApiService } from '../.././api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login: any = FormGroup;
  userlist: any;
  constructor(
    private formBuilder: FormBuilder,
    private Api: ApiService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}
  ngOnInit() {
    this.getUserdata();
    this.createForm();
  }
  createForm() {
    this.login = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  getUserdata() {
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
        this.userlist[key].username === this.login.value.username &&
        this.userlist[key].user_password === this.login.value.password
      ) {
        localStorage.setItem('UserId', this.userlist[key].userid);
        localStorage.setItem('isLoggedIn', 'yes');
        this.dialogRef.close();
      } else {
        console.log('wrong Password');
      }
    });
  }
}
