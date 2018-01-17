import { Component, OnInit } from '@angular/core';
import { AddressApiService } from '../address-api.service';

@Component({
  selector: 'new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.css']
})
export class NewAddressComponent implements OnInit {

  constructor(private addressService: AddressApiService) { }

  ngOnInit() {
    this.addressService.newAddress('Entry Name', 'Company Name', 'Recipient', 'Street 1', 'Street 2', 'City', 'MO', '12345');
  }

}
