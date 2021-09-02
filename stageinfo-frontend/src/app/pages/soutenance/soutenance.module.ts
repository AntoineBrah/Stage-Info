import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'

import { SharedModule } from '../../shared/shared.module';

import { ListSoutenancesComponent } from './list-soutenances/list-soutenances.component';
import { AddSoutenanceComponent } from './add-soutenance/add-soutenance.component';
import { ConfigCalendrierSoutenancesComponent } from './config-calendrier-soutenances/config-calendrier-soutenances.component';



@NgModule({
  declarations: [
    ListSoutenancesComponent, 
    AddSoutenanceComponent, 
    ConfigCalendrierSoutenancesComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    SharedModule
  ],exports:[
    ListSoutenancesComponent, 
    AddSoutenanceComponent,
    ConfigCalendrierSoutenancesComponent
  ],
})
export class SoutenanceModule { }
