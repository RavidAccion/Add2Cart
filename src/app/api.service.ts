import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: any = 'https://localhost:7228';

  constructor(private http: HttpClient) {}

  createCustomer(CustomerData: any) {
    return this.http.post(this.url + '/api/Customers/create', CustomerData);
  }
  getUserDataById(Id: any) {
    return this.http.get(this.url + `/api/Customers/${Id}`);
  }
  getUserData() {
    return this.http.get(this.url + '/api/Customers/get');
  }
  getCartData() {
    return this.http.get(this.url + '/api/Cart/get');
  }
  getCartDataById(id: any): Observable<any> {
    return this.http.get(this.url + `/api/Cart/${id}`);
  }

  deleteCartItem(id: any) {
    return this.http.delete(this.url + `/api/Cart/${id}/delete`);
  }
  getCategoryData() {
    return this.http.get(this.url + '/api/category/get');
  }
  getProductData() {
    return this.http.get(this.url + '/api/Product/get');
  }

  getProductsByCategory(Id: any) {
    return this.http.get(this.url + `/api/Product/getProducts/${Id}`);
  }
  getOrders() {
    return this.http.get(this.url + '/api/Order/get');
  }
  createOrder(data: any) {
    return this.http.post(this.url + '/api/Order/create', data);
  }
  updateOrder(data: any) {
    return this.http.put(this.url + '/api/Order/edit', data);
  }

  craeteProduct(data: any) {
    return this.http.post(this.url + '/api/Product/create', data);
  }
  getOrderById(id: any) {
    return this.http.get(this.url + `/api/Order/${id}`);
  }
  craeteCategory(data: any) {
    return this.http.post(this.url + '/api/category/create', data);
  }

  deleteCategory(id: any) {
    return this.http.delete(this.url + `/api/category/${id}/delete`);
  }

  postCartdatas(data: any) {
    return this.http.post('https://localhost:7228/api/Cart/create', data);
  }

  deleteCartAfterOrder(id: any) {
    return this.http.delete(this.url + `/api/Order/cart/${id}/delete`);
  }
}
