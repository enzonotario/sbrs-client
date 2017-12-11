import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';

import { AppComponent } from './app.component';
import { RequestInterceptor } from '../config/interceptors/request.interceptor';

import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DirectoryComponent} from "./directory/directory.component";
import {FileComponent} from "./file/file.component";
import {SearchComponent} from "./search/search.component";

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DirectoryComponent,
    FileComponent,
    SearchComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    CovalentHighlightModule,
    CovalentMarkdownModule,
  ],
  providers: [
    httpInterceptorProviders,
    Title,
  ],
  entryComponents: [ ],
  bootstrap: [ AppComponent ],
  exports: [
    SharedModule,
  ],
})
export class AppModule {}
