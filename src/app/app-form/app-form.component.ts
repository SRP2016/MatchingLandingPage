import { ValidationService } from './../validator-services/validation.service';
import { AppFormDataService } from './app-form-dataService';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



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
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) { }
  public mask = {
    guide: true,
    showMask : true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/]
  };
  formMdl: FormGroup;
  submitted = false;
  success = false;
  viwMatrimInput = false;
  globalMsgExption;
  matrim: any = {};
  matrimName = '';
  title = 'Mega matching';
  error = {};
  currencies;
  paymentsValues = [1,2,3,4,5,6,7,8,9,10,11,12];
  personFocusOut(e) {
    let personId = e.target.value;
    this.getPersonName(personId);

  }

  openDialog(nessage): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { message: nessage }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  initForm() {
    this.formMdl = this.fb.group({
      id: [],
      person: [], //מס' מתרים
      full_name: [''],
      email: ['', [ValidationService.emailValidator]],
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

  errorMessage(e: FormControl) {
    if (e.errors) {
      for (let propertyName in e.errors) {
        if (e.errors.hasOwnProperty(propertyName) && e.touched) {
          return ValidationService.getValidatorErrorMessage(propertyName, e.errors[propertyName]);
        } else {
          return null;
        }
      }
      return null;
    }
  }


  loadData() {
   
    // this.appFormDataService.getPermission()
    // .subscribe((x: any) => {
    //   //this.currencies = x;
    // }, // success path
    //   error => {          
    //    // console.log("שגיאה בטעינת מטבעות", error);
    //   }
    // );

    this.appFormDataService.getCurrencies()
      .subscribe((x: any) => {
        this.currencies = x;
      },
        error => {          
          console.log("שגיאה בטעינת מטבעות", error);
        }
      );
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
          console.log("מתרים לא נמצא", error.message);
        }
      );
  }

  onSubmit() {
    this.error = {};
    this.globalMsgExption = '';

    if (this.formMdl.invalid) {
      return;
    }
    var frmVal = this.formMdl.value;
    var formToPost =
    {
      "id": frmVal.id,
      "person": frmVal.person,
      "full_name": frmVal.full_name,
      "credit_number": frmVal.credit_number,
      "credit_exp": frmVal.credit_exp,
      "amount": frmVal.amount,
      "email": frmVal.email,
      "payments": frmVal.payments,
      "currency_id": frmVal.currency_id,
      "address": frmVal.address,
      "city_name": frmVal.city_name,
      "state": frmVal.state,
      "phone": frmVal.phone
    }
    if(formToPost.id == null)
    {
      delete formToPost.id;  
    }
   
    this.appFormDataService.postForm(formToPost)
      .subscribe(x => {
        this.openDialog(x);
        //console.log(x);
      }, error => {
        if (error.status < 500 && error.error) {
          this.error = error.error;
          let props = Object.keys(error.error);
          props.forEach(p => {
            this.formMdl.controls[p].setErrors(error.error[p]);
          });
        } else {
          this.error = error;
          if(error.message && error.message.toString().length > 30)
          {
            error.message = error.message.substr(0,30);
          }
          
          this.globalMsgExption = `[${error.status}] ${error.message}`;
        }
        //this.formMdl.controls
        // console.log(error.error);

      });
    //this.success = true;
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: '<h1>{{data}}</h1>',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}