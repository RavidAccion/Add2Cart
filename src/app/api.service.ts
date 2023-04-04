import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: any = 'https://localhost:7228';
  constructor(private http: HttpClient) {}

  getUserData() {
    return this.http.get(this.url + '/api/Login/get');
  }
  getCartData() {
    return this.http.get(this.url + '/api/Cart/get');
  }
  getCartDataById(id: any) {
    return this.http.get(this.url + `/api/Cart/${id}`);
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
  craeteProduct(data: any) {
    return this.http.post(this.url + '/api/Product/create', data);
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
}
