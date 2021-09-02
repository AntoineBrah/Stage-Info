import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'

import { ListEntreprisesComponent } from './list-entreprises/list-entreprises.component';
import { InfoEntrepriseComponent } from './info-entreprise/info-entreprise.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ListEntreprisesComponent, 
    InfoEntrepriseComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    SharedModule
  ],
  exports: [
    ListEntreprisesComponent, 
    InfoEntrepriseComponent
  ],
})
export class EntrepriseModule { }
