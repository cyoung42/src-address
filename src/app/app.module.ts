import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AddressApiService } from './address-api.service';

import { AppComponent } from './app.component';
import { AddressListComponent } from './address-list/address-list.component';
import { NewAddressComponent } from './new-address/new-address.component';


@NgModule({
  declarations: [
    AppComponent,
    AddressListComponent,
    NewAddressComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule
  ],
  providers: [AddressApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
