import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  productForm: any = FormGroup;
  categoryForm: any = FormGroup;
  deletecategory: any = FormGroup;
  categorylist: any;
  deleteForm: boolean = false;
  constructor(private formBuilder: FormBuilder, private Api: ApiService) {}

  ngOnInit(): void {
    this.productFormBuild();
    this.categoryFormBuild();
    this.deleteCatformBuild();
    this.getData();
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
  getData() {
    this.Api.getCategoryData().subscribe((res) => {
      this.categorylist = res;
      console.log(this.categorylist);
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
  }

  categoryDeleteData() {
    console.log(this.deletecategory.getRawValue().category_id);
    var id = this.deletecategory.getRawValue().category_id;
    this.Api.deleteCategory(id).subscribe((res) => {
      console.log(res);
    });
  }

  deleteCategory() {
    this.deleteForm = true;
  }
  addCategory() {
    this.deleteForm = false;
  }
}
