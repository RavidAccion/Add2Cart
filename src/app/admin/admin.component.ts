import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Location } from '@angular/common';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  statuslist: any = [
    { name: 'placed' },
    { name: 'processed' },
    { name: 'cancelled' },
    { name: 'delivered' },
  ];
  OrderData: any;
  redBG: any = false;
  productForm: any = FormGroup;
  categoryForm: any = FormGroup;
  orderstatusForm: any = FormGroup;
  deletecategory: any = FormGroup;
  categorylist: any;
  deleteForm: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['orderid', 'order_status', 'weight', 'symbol'];
  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public location: Location,
    private Api: ApiService
  ) {}

  ngOnInit(): void {
    this.getOrders();
    this.productFormBuild();
    this.categoryFormBuild();
    this.deleteCatformBuild();
    this.getData();
    this.orderStatusFormBuild();
  }
  deleteCatformBuild(): void {
    this.deletecategory = this.formBuilder.group({
      category_id: ['', [Validators.required]],
    });
  }
  categoryFormBuild(): void {
    this.categoryForm = this.formBuilder.group({
      category_name: ['', [Validators.required]],
      category_description: ['', [Validators.required]],
    });
  }
  productFormBuild() {
    this.productForm = this.formBuilder.group({
      product_name: ['', [Validators.required, Validators.minLength(2)]],
      product_weight: ['', [Validators.required]],
      price: ['', [Validators.required]],
      product_description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      stock: ['', [Validators.required]],
    });
  }

  orderStatusFormBuild() {
    this.orderstatusForm = this.formBuilder.group({
      order_id: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }
  getData() {
    this.Api.getCategoryData().subscribe((res) => {
      this.categorylist = res;
      console.log(this.categorylist);
    });
  }
  getOrders() {
    this.Api.getOrders().subscribe((res) => {
      this.OrderData = res;
      if ((this.OrderData.order_status = 'cancelled')) {
        this.redBG = true;
      } else {
        this.redBG = false;
      }
      console.log(this.OrderData);
    });
  }

  subData() {
    this.productForm.getRawValue();
    var data = {
      product_name: this.productForm.value.product_name,
      product_weight: this.productForm.value.product_weight,
      price: this.productForm.value.price,
      product_description: this.productForm.value.product_description,
      category: this.productForm.value.category,
      stock: this.productForm.value.stock,
    };
    console.log(data);
    this.Api.craeteProduct(data).subscribe((res) => {
      this.categorylist = res;
      console.log(this.categorylist);
    });
    this._snackBar.open('New Product', 'Added', {
      duration: 1000,
      panelClass: ['succesColor'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    this.productForm.reset();
  }
  statusData() {
    console.log(this.orderstatusForm.value);
    var data = {
      id: this.orderstatusForm.value.order_id,
      status: this.orderstatusForm.value.status,
    };
    this.Api.updateOrder(data).subscribe((res) => {
      console.log(res);
      this._snackBar.open('Order Status Updated Successfully', '', {
        duration: 500,
        panelClass: ['succesColor'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.orderstatusForm.reset();
      this.ngOnInit();
    });
  }
  categoryData() {
    var data = {
      category_name: this.categoryForm.value.category_name,
      category_description: this.categoryForm.value.category_description,
    };
    console.log(data);
    this.Api.craeteCategory(data).subscribe((res) => {
      this.categorylist = res;
      console.log(this.categorylist);
    });
    this._snackBar.open('New Category', 'Added', {
      duration: 500,
      panelClass: ['succesColor'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    this.categoryForm.reset();
  }

  categoryDeleteData() {
    console.log(this.deletecategory.getRawValue().category_id);
    var id = this.deletecategory.getRawValue().category_id;
    this.Api.deleteCategory(id).subscribe((res) => {
      console.log(res);
    });
    this._snackBar.open('Category Deleted From The DB', '', {
      duration: 500,
      panelClass: ['succesColor'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    this.deletecategory.reset();
  }

  deleteCategory() {
    this.deleteForm = true;
  }
  addCategory() {
    this.deleteForm = false;
  }

  toPrevious() {
    this.location.back();
  }
}
