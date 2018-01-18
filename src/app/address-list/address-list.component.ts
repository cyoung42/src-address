import { Component, OnInit, OnChanges, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { AddressApiService } from '../address-api.service';

import * as _ from 'underscore';

@Component({
  selector: 'address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {

  @Input() options : any;
  @Output() optionsChange = new EventEmitter();

  addresses: any;
  displayAddresses : any [];
  selectedID : string;

  constructor(private addressService: AddressApiService) { }

  ngOnInit() {
    this.addressService.getAllAddresses().subscribe(addr => {
      this.addresses = addr;
      this.displayAddresses = addr;
      this.options.searchTotal = addr.length;

      let newObj = Object.assign({}, this.options);
      this.optionsChange.emit(newObj);
    });
  }

  ngOnChanges(changes: any) {
    //if anything has been inputted into fields
    if (this.options !== undefined && this.options.formFields.constructor === Object && Object.keys(this.options.formFields).length > 0) {
      this.searchAddresses();
    } else {
      this.addressService.getAllAddresses().subscribe(addr => {
        if (!_.isEqual(this.addresses, addr)) {
          this.addresses = addr;
          this.displayAddresses = addr;
          this.options.searchTotal = addr.length;

          let newObj = Object.assign({}, this.options);
          this.optionsChange.emit(newObj);
        }

      });
      this.displayAddresses = this.addresses;
    }

    if (this.options !== undefined && this.options.selectedAddress == null) {
      this.selectedID = '';
    }
  }

  //search through addresses for a match to all formFields
  //recursive through all available addresses
  searchAddresses() {
    let newAddresses = this.addresses;

    _.each(this.options.formFields, function(value, key) {
      newAddresses = _.filter(newAddresses, function(a) { return a[key].toLowerCase().includes(value.toLowerCase()) })
    })

    this.displayAddresses = newAddresses;

    this.options.searchTotal = newAddresses.length;
    let newObj = Object.assign({}, this.options);
    this.optionsChange.emit(newObj);
  }

  //pass address up when selecting from list
  selectAddress(passID) {
    this.selectedID = passID;
    this.options.selectedAddress = _.findWhere(this.addresses, {id : passID} );
    let newObj = Object.assign({}, this.options);
    this.optionsChange.emit(newObj);
  }

}
