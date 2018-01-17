import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AddressApiService {

  constructor(private http: Http) { }

  getAllAddresses() {
    return this.http.get('/api/address')
      .map(res => res.json());
  }

  newAddress(ename, cname, rname, s1, s2, c, st, z) {
    console.log(`newAddress: ${ename},${cname},${rname},${s1},${s2},${c},${st},${z}`);
    
    const body = {
      entryname : ename,
      companyname: cname,
      recipientname: rname,
      street1: s1,
      street2: s2,
      city: c,
      state: st,
      zip: z
    };

    this.http.post('/api/newaddress', body).subscribe();
  }

}
