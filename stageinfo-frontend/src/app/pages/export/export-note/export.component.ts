import { Component, OnInit } from '@angular/core';
import {concat} from "rxjs";
import {AllStagesResolver} from "../../../core/resolvers/all-stages.resolver";
import {ActivatedRoute, Router} from "@angular/router";
import { CsvDataService } from 'src/app/core/services/CsvDataService';
import {forEach} from "ol/geom/flat/segments";
import {FormBuilder, Validators} from "@angular/forms";


@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

 Allstage : any
  importForm: any;
  constructor(private route:ActivatedRoute,
              private formBuilder: FormBuilder) {  }

  ngOnInit(): void {
    this.Allstage = this.route.snapshot.data.stages;
    this.initForm()
  }
  initForm(){
    this.importForm = this.formBuilder.group({
      ann: ['',Validators.required],
    });
  }

   onSubmit(){
   console.log(this.Allstage)
     const datastage = new Array();
   var j=0;
for( var i =0;i<this.Allstage.length;i++){
  if(this.Allstage[i].etudiant !=null) {
    datastage[j] = {numetudiant: this.Allstage[i]?.etudiant?.numeroEtudiant,note:this.Allstage[i]?.noteStage?.valeur};
    j++;
  }
}

  CsvDataService.exportToCsv('test.csv', datastage);
}
}
