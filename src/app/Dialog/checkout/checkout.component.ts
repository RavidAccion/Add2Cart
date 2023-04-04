import { Component, Inject } from '@angular/core';
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
  datalist: any;
  address: any = FormGroup;
  lengt: any;
  selectable: boolean = true;

  offers = [{ name: 'Debit Card' }, { name: 'Credit Card' }, { name: 'C O D' }];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CheckoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = [],
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // console.log(this.data.length);
    this.adresssForm();
    this.getPrice();
  }

  getPrice() {
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
      state: ['', Validators.required],
      city: ['', Validators.required],
      pin: ['', Validators.required],
      landmark: ['', Validators.required],
    });
  }
  onSubmit() {
    console.log(this.address.value);
  }
  payment(offer: any) {
    console.log(offer);
  }
}
