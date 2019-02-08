
import {  MatButtonModule, MatToolbarModule,MatIconModule, MatRadioModule,MatCheckboxModule, MatCardModule, MatSelectModule, MatOptionModule,MatFormFieldModule,MatInputModule, MatCardTitle} from '@angular/material';
import { CommonModule } from '@angular/common';
import { AppFormModule } from './app-form/app-form.module'; 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  
  imports: [    
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppFormModule,
    MatToolbarModule,
    MatCardModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
