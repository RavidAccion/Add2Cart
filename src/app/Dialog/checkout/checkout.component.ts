import { Component, Inject } from '@angular/core';
import { ApiService } from '../.././api.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  totalPrice: any;
  userlist: any;
  datalist: any;
  address: any = FormGroup;
  lengt: any;
  paymentmethood: any;
  UserId: any;
  selectable: boolean = true;

  offers = [{ name: 'Debit Card' }, { name: 'Credit Card' }, { name: 'C O D' }];

  constructor(
    private Api: ApiService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CheckoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = [],
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // console.log(this.data.length);
    this.adresssForm();
    this.getPrice();
    this.getuserList();
  }
  getuserList() {
    var id = this.UserId;
    this.Api.getUserDataById(id).subscribe((res) => {
      this.userlist = res;

      this.address =
        this.userlist[0].state +
        ',' +
        this.userlist[0].city +
        ',' +
        this.userlist[0].landmark +
        ',' +
        this.userlist[0].pin;

      console.log(this.address);
    });
  }
  getPrice() {
    this.UserId = localStorage.getItem('UserId');
    this.lengt = this.data.length;
    const _data = localStorage.getItem('totalPrice');
    this.totalPrice = JSON.parse(_data || '{}');
    console.log(this.totalPrice);
    console.log(this.data);
    this.datalist = this.data;
  }
  adresssForm() {
    this.address = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pin: ['', Validators.required],
      landmark: ['', Validators.required],
    });
  }
  onSubmit() {
    const totalPrice = localStorage.getItem('totalPrice');
    this.data.forEach((element: any) => {
      var data = element;
      var OrderDetails = {
        cus_Id: this.UserId,
        address: this.address,
        total_price: totalPrice,
        Product_id: element.product_id,
        order_status: 'placed',
      };
      console.log(OrderDetails);
      this.Api.createOrder(OrderDetails).subscribe((res) => {
        console.log('data response1', res);
      });
    });
  }
  payment(offer: any) {
    console.log(offer.name);
    this.paymentmethood = offer.name;
  }
}
