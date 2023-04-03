import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  totalPrice: any;
  datalist: any;
  lengt: any;
  selectable: boolean = true;

  offers = [{ name: 'Debit Card' }, { name: 'Credit Card' }, { name: 'C O D' }];

  constructor(
    public dialogRef: MatDialogRef<CheckoutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = []
  ) {}

  ngOnInit() {
    // console.log(this.data.length);
    this.lengt = this.data.length;
    const _data = localStorage.getItem('totalPrice');
    this.totalPrice = JSON.parse(_data || '{}');
    console.log(this.totalPrice);
    console.log(this.data);
    this.datalist = this.data;
  }

  payment(offer: any) {
    console.log(offer);
  }
}
