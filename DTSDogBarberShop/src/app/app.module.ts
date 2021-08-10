import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatInputModule } from '@angular/material/input';
import {MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { CreateNewAccountComponent } from './components/auth/create-new-account/create-new-account.component';
import { LoginComponent } from './components/auth/login/login.component';
import { WaitingListComponent } from './components/waiting-list/waiting-list.component';
import { CreateOrEditQueueComponent } from './components/create-ot-edit-queue/create-or-edit-queue.component';
import { HeaderComponent } from './components/header/header.component';
import { AlertComponent } from './components/create-ot-edit-queue/alert/alert.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateNewAccountComponent,
    LoginComponent,
    WaitingListComponent,
    CreateOrEditQueueComponent,
    HeaderComponent,
    AlertComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
