import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Error404Component } from './erreurs/error404/error404.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from "@angular/forms";

// Importation des modules
import { SharedModule } from '../shared/shared.module';
import { UserModule } from './user/user.module';
import { StageModule } from './stage/stage.module';
import { ParcoursModule } from './parcours/parcours.module';
import { EntrepriseModule } from './entreprise/entreprise.module';
import { SoutenanceModule } from './soutenance/soutenance.module';
import { Error401Component } from './erreurs/error401/error401.component';
import { Error500Component} from "./erreurs/error500/error500.component";
import { ExportComponent } from './export/export-note/export.component';
import { ExportStageComponent } from './export/export-stage/export-stage.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { ContactModule } from './contact/contact.module';


@NgModule({
  declarations: [
    Error404Component,
    LoginComponent, 
    Error401Component,
    Error500Component, 
    ExportStageComponent,
    ExportComponent, 
    ForgotPasswordComponent
   ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    UserModule,
    StageModule,
    EntrepriseModule,
    SoutenanceModule,
    ParcoursModule,
    ContactModule,
    ],
  exports:[
    Error404Component,
    LoginComponent,

    SharedModule,
    UserModule,
    StageModule,
    EntrepriseModule,
    SoutenanceModule,
    ParcoursModule,
    ContactModule,
  ],
})
export class PagesModule { }
