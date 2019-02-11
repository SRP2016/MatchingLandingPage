import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';  // Import it up here

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization':  'Token f45a7e75aea18eb966f10d2445ff9aae7de5aba1'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AppFormDataService {

  url = 'http://212.71.250.78:8000';
  constructor(private http: HttpClient) { }
  
  getPermission(): any {
    return this.http.get(`${this.url}/permission/`, httpOptions);
  }

  getCurrencies() {
    return this.http.get(`${this.url}/currency/`, httpOptions);
  }

  // getcurrency() {
  //   //return this.http.get('http://212.71.250.78:8000/getcurrency') 
  // }

  postForm(formModel) {
    return this.http.post(`${this.url}/donate/`, formModel);
  }

  getName(sub: string): any {
    return this.http.get(`${this.url}/getname/${sub}`);
  }
}
