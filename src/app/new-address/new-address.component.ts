import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { AddressApiService } from '../address-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'new-address',
  templateUrl: './new-address.component.html',
  styleUrls: ['./new-address.component.scss']
})
export class NewAddressComponent implements OnInit {
  @Input() options : any;
  @Output() optionsChange = new EventEmitter();

  entryShow : boolean = false;
  error : boolean = false;

  constructor(private addressService: AddressApiService) { }

  ngOnInit() {

  }

  ngOnChanges(changes: any) {
    if (this.options.searchTotal == 0) { this.entryShow = true; }
  }

  resetForm() {
    this.options.selectedAddress = null;
    let newObj = Object.assign({}, this.options);
    this.optionsChange.emit(newObj);
  }

  //on change for inputs in forms
  //passed up for address list search
  inputChange(e, name) {
    this.options.formFields[name] = e;
    let newObj = Object.assign({}, this.options);
    this.optionsChange.emit(newObj);
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      this.error = false;
      this.addressService.newAddress(f.value.entryname, f.value.companyname, f.value.recipientname, f.value.street1, f.value.street2, f.value.city, f.value.state.toUpperCase(), f.value.zip);

      f.reset();

      this.options.formFields = {};
      let newObj = Object.assign({}, this.options);
      this.optionsChange.emit(newObj);

    } else {
      this.error = true;
    }
  }

}
