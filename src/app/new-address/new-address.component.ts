import { Component, OnInit } from '@angular/core';
import { AddressApiService } from '../address-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.scss']
})
export class NewAddressComponent implements OnInit {

  constructor(private addressService: AddressApiService) { }

  ngOnInit() {
    //this.addressService.newAddress('Entry Name', 'Company Name', 'Recipient', 'Street 1', 'Street 2', 'City', 'MO', '12345');
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    //console.log(f.valid);

    if (f.valid) {
      console.log('valid');
      //this.addressService.newAddress(f.value.entryname, f.value.companyname, f.value.recipientname, f.value.street1, f.value.street2, f.value.city, f.value.state, f.value.zip);
    }
  }

}
