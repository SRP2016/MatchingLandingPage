import { FlexLayoutModule } from '@angular/flex-layout';

import { ValidationService } from './../validator-services/validation.service';
import { ControlMessagesComponent } from './../validator-services/control-messages.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppFoemRoutingModule as AppFormRoutingModule } from './app-form-routing.module';
import { AppFormComponent, DialogOverviewExampleDialog } from './app-form.component';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatRadioModule, MatCheckboxModule, MatCardModule, MatSelectModule, MatOptionModule, MatFormFieldModule, MatInputModule, MatDialogModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CreditCardDirectivesModule } from 'angular-cc-library';

import { TextMaskModule } from 'angular2-text-mask';
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppFormRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule,
    FlexLayoutModule,
    CreditCardDirectivesModule,
    MatDialogModule,
    TextMaskModule
  ],
  declarations: [
    AppFormComponent,
    ControlMessagesComponent,
    DialogOverviewExampleDialog
  ],
  exports: [AppFormComponent],
  providers: [ValidationService],
  bootstrap: [],
  entryComponents: [DialogOverviewExampleDialog]
})
export class AppFormModule { }
