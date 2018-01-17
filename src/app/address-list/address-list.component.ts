import { Component, OnInit } from '@angular/core';
import { AddressApiService } from '../address-api.service';

@Component({
  selector: 'address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  addresses: any = [];

  constructor(private addressService: AddressApiService) { }

  ngOnInit() {
    this.addressService.getAllAddresses().subscribe(addr => {
      console.dir(addr);
      this.addresses = addr;
    });
  }

}
