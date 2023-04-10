import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'product',
    component: ProductpageComponent,
  },
  {
    path: 'orders',
    component: MyOrdersComponent,
    canActivate: [AuthServiceService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthServiceService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router) {}
  /*Checks route navigation before the component is loaded */
  canActivate(): any {
    const token = sessionStorage.getItem('Token');
    if (token) {
      console.log(token);
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
