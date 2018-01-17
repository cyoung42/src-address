import { Component, OnInit, OnChanges, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { AddressApiService } from '../address-api.service';

@Component({
  selector: 'address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {

  @Input() options : any;
  @Output() optionsChange = new EventEmitter();

  addresses: any = [
    {
      id:1,
      entryname: 'entry',
      companyname: 'company',
      recipientname:'def',
      street1:'street1',
      city:'city',
      state:'MO',
      zip:"12345"
    },
    {
      id:2,
      entryname: 'entry2',
      companyname: 'abc',
      recipientname:'abc',
      street1:'street1 2',
      street2:'street2',
      city:'city2',
      state:'AZ',
      zip:"67899"
    }
  ];

  displayAddresses : any [];
  selectedID : string;

  constructor(private addressService: AddressApiService) { }

  ngOnInit() {
    this.addressService.getAllAddresses().subscribe(addr => {
      //console.dir(addr);
      this.addresses = addr;
      this.displayAddresses = addr;
      this.options.searchTotal = addr.length;

      let newObj = Object.assign({}, this.options);
      this.optionsChange.emit(newObj);
    });

    this.displayAddresses = this.addresses;
  }

  ngOnChanges(changes: any) {
    //if anything has been inputted into fields
    if (this.options.formFields.constructor === Object && Object.keys(this.options.formFields).length > 0) {
      this.searchAddresses();
    }

    if (this.options.selectedAddress == null) {
      this.selectedID = '';
    }
  }

  //search through addresses for a match to all formFields
  //recursive through all available addresses
  searchAddresses() {
    let newAddresses = this.addresses;

    _.each(this.options.formFields, function(value, key) {
      newAddresses = _.filter(newAddresses, function(a) { return a[key].includes(value) })
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
