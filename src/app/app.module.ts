import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/Common/navbar/navbar.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProductoService } from './service/producto.service';


@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    NavbarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
          ],
  providers: [
    ProductoService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
