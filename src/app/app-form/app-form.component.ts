import { ValidationService } from './../validator-services/validation.service';
import { AppFormDataService } from './app-form-dataService';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
 


@Component({
  selector: 'app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.scss']
})
export class AppFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private data: AppFormDataService
  ) { }
  formMdl: FormGroup;
  submitted = false;
  success = false;

  title = 'Mega matching';
  
  initForm() {
    this.formMdl = this.fb.group({
      firstName: [''],
      lastName: [''],
      email   : ['', [Validators.email]],
      
      address:[],
      cityName: [''],
      phoneNumber: [''],
      countryName: [''],
      ccNumber: ['',[ValidationService.creditCardValidator]],
      ccExp: [],
      amount:[],
      qty: [],
      currency: [],
      metersNr: [],
    })
  }

  errorMessage(e:FormControl) {
    for (let propertyName in e.errors) {
      if (e.errors.hasOwnProperty(propertyName) && e.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, e.errors[propertyName]);
      }
    }

    return null;
  }


  loadData() {
    
  }
  ngOnInit() {
    this.initForm();
    this.loadData();
  }
  onSubmit() {
    this.submitted = true;

    if (this.formMdl.invalid) {
      return;
    }

    this.success = true;
  }

}
