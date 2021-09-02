import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID } from "@angular/core";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// for Router import:
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LOADING_BAR_CONFIG } from '@ngx-loading-bar/core';


// importation mes modules
import { PagesModule } from './pages/pages.module';
import { CoreModule } from './core/core.module';

import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';
import { AngularFileUploaderModule } from "angular-file-uploader";
import {PapaParseModule} from "ngx-papaparse";

// Par exemple pour obtenir les dates en fr
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    PapaParseModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFileUploaderModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Loading bar
    LoadingBarRouterModule,
    LoadingBarModule,

    PagesModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    // Permet de commencer la bar de chargement un peu plus tard (quand ça commence à faire long)
    { provide: LOADING_BAR_CONFIG, useValue: { latencyThreshold: 100 } },
    { provide: LOCALE_ID, useValue: "fr-FR" }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
