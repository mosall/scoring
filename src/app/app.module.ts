import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {AppRoutes} from "./app.routing";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { ChartsModule } from 'ng2-charts';
import {MatCurrencyFormatModule} from "mat-currency-format";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {PdfViewerModule} from "ng2-pdf-viewer";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule, PdfViewerModule,
    RouterModule.forRoot(AppRoutes),
    ChartsModule, MatCurrencyFormatModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
