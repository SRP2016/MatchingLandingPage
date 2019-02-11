import { ValidationService } from './../validator-services/validation.service';
import { AppFormDataService } from './app-form-dataService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.scss']
})
export class AppFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private appFormDataService: AppFormDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  formMdl: FormGroup;
  submitted = false;
  success = false;
  viwMatrimInput = false;
  matrim: any = {};
  matrimName = '';
  title = 'Mega matching';
  error = {};
  personFocusOut(e) {
    let personId = e.target.value;
    this.getPersonName(personId);

  }


  initForm() {
    this.formMdl = this.fb.group({
      id: [],
      person: [], //מס' מתרים
      full_name: [''],
      email: ['', [Validators.email]],
      address: [''],
      city_name: [''],
      state: [''], //מדינה
      phone: [''],
      credit_number: ['', [ValidationService.creditCardValidator]],
      credit_exp: [, Validators.required],
      amount: [, Validators.required],
      payments: [1, Validators.required], //תשלומים
      currency_id: [, Validators.required],
      metersNr: [],
    })
  }

  errorMessage(controlName: string) {
   let ctrl = this.formMdl.controls['controlName'];
      if (ctrl.touched) {
        return ValidationService.getValidatorErrorMessage(controlName, ctrl.errors[controlName]);
      }

    return null;
  }


  loadData() {

  }
  ngOnInit() {
    this.initForm();

    let url = "http://0.100100.bb/"
    // let lctn = document.location.toString();
    //  let sub = lctn.split('//')[1].split('.')[0];
    let lctn = document.location.toString();
    let sub = url.split('//')[1].split('.')[0];

    if (sub != null) {
      if (sub == '0') {
        this.viwMatrimInput = true;
      } else {
        this.getPersonName(sub);
      }
    }
    this.loadData();
  }
  private getPersonName(sub: string) {
    this.appFormDataService.getName(sub)
      .subscribe((x: any) => {
        this.matrim = x;
        this.viwMatrimInput = false;
      }, // success path
        error => {
          this.viwMatrimInput = true;
          console.log("שגיאה בחיפוש");
          console.log(error.message);
        }
      );
  }

  onSubmit() {



    // if (this.formMdl.invalid) {
    //   return;
    // }
    var frmVal = this.formMdl.value;
    var formToPost =
    {
      "person": frmVal.person,
      "full_name": frmVal.full_name,
      "credit_number": frmVal.credit_number,
      "credit_exp": frmVal.credit_exp,
      "amount": +frmVal.amount,
      "email": frmVal.email,
      "payments": frmVal.payments,
      "currency_id": frmVal.currency_id,
      "address": frmVal.address,
      "city_name": frmVal.city_name,
      "state": frmVal.state,
      "phone": frmVal.phone
    }
    this.appFormDataService.postForm(formToPost)
      .subscribe(x => {
        console.log(x);
      }, error => {
        this.error = error.error;
        // console.log(error.error);

      });
    this.success = true;
  }

}
