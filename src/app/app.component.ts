import { Component, EventEmitter, Input, Output } from '@angular/core';

import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  addressOptions : any {
    selectedAddress: null,
    searchTotal: null,
    formFields: {}
  };

}
