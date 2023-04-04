import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductpageComponent } from './productpage/productpage.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './Dialog/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'primeng/carousel';
import { MatSelectModule } from '@angular/material/select';
import { ButtonModule } from 'primeng/button';
import { MatRadioModule } from '@angular/material/radio';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CheckoutComponent } from './Dialog/checkout/checkout.component';
import { AdminComponent } from './admin/admin.component';
import { MatBadgeModule } from '@angular/material/badge';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    ProductpageComponent,
    LoginComponent,
    CheckoutComponent,
    AdminComponent,
  ],
  imports: [
    MatBadgeModule,
    MatCardModule,
    IvyCarouselModule,
    MatSelectModule,
    MatRadioModule,
    HttpClientModule,
    BrowserModule,
    MatChipsModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    CarouselModule,
    ButtonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
