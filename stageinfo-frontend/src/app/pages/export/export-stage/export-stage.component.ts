import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {CsvDataService} from "../../../core/services/CsvDataService";

@Component({
  selector: 'app-export-stage',
  templateUrl: './export-stage.component.html',
  styleUrls: ['./export-stage.component.scss']
})
export class ExportStageComponent implements OnInit {
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


    CsvDataService.exportToCsv('test.csv', this.Allstage);
  }
}

