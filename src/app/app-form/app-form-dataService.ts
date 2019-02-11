import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here

@Injectable({
  providedIn: 'root'
})
export class AppFormDataService {

  url = 'http://212.71.250.78:8000';
  constructor(private http: HttpClient) { }
  getCurrencies() {
    return ['', '', '', '', ''];
  }
  getcurrency() {
    //return this.http.get('http://212.71.250.78:8000/getcurrency') 
  }
  postForm(formModel) {
    return this.http.post('http://212.71.250.78:8000/donate/',formModel);
  }

  getName(sub: string): any {
    return this.http.get(`${this.url}/getname/${sub}`);
  }
}
