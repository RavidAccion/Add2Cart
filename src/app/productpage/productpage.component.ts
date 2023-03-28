import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.scss'],
})
export class ProductpageComponent {
  constructor(public router: Router, public location: Location) {}
  toPrevious() {
    this.location.back();
  }

  sampleSuggestionsArray = [
    {
      id: '1',
      menuName: 'Item 1',
      variationCost: '20.50',
      desc: 'Lorem ipsum dolor sit amet..',
      qtyTotal: 0,
    },
    {
      id: '2',
      menuName: 'Item 2',
      variationCost: '10',
      desc: 'Lorem ipsum dolor sit amet..',
      qtyTotal: 0,
    },
    {
      id: '3',
      menuName: 'Item 3',
      variationCost: '5.50',
      desc: 'Lorem ipsum dolor sit amet..',
      qtyTotal: 0,
    },
  ];

  addToCart(item: any) {
    // if (!this.cartService.itemInCart(item)) {
    //   item.qtyTotal = 1;
    //   this.cartService.addToCart(item); //add items in cart
    //   this.items = [...this.cartService.getItems()];
    //}
  }
}
