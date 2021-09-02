import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { ListStagesComponent } from './list-stages/list-stages.component';
import { InfoStageComponent } from './info-stage/info-stage.component';
import { AddStageComponent } from './add-stage/add-stage.component';
import { FicheSuiviComponent } from './fiche-suivi/fiche-suivi.component';
import { FicheNotationComponent } from './fiche-notation/fiche-notation.component';
import { FicheAppreciationComponent } from './fiche-appreciation/fiche-appreciation.component';

@NgModule({
  declarations: [ListStagesComponent, InfoStageComponent, AddStageComponent, FicheSuiviComponent, FicheNotationComponent, FicheAppreciationComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    ListStagesComponent,
    AddStageComponent,
  ]
})
export class StageModule { }
