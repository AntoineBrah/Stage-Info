import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExempleDocComponent } from './exemple-doc/exemple-doc.component';



@NgModule({
  declarations: [ExempleDocComponent],
  imports: [
    CommonModule
  ], exports:[ExempleDocComponent]
})
export class DocumentationModule { }
