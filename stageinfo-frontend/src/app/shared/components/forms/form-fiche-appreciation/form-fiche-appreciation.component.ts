import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-fiche-appreciation',
  templateUrl: './form-fiche-appreciation.component.html',
  styleUrls: ['./form-fiche-appreciation.component.scss']
})
export class FicheAppreciationStageComponent implements OnInit {

  public readonly title: string = "Fiche d'appréciation du stage";

  // @ts-ignore
  ficheAppreciationForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.ficheAppreciationForm = this.formBuilder.group({});
  }

  onSubmitForm() {
    const formValue = this.ficheAppreciationForm.value;
    console.log(formValue)
  }

}
