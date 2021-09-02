import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AutocompletionSearch } from 'src/app/shared/classes/autocompletion-search';
import { isStudentValidator, isRepresentantValidator, isTuteurUniversiteValidator } from 'src/app/core/validators/validators';

@Component({
  selector: 'app-form-fiche-notation',
  templateUrl: './form-fiche-notation.component.html',
  styleUrls: ['./form-fiche-notation.component.scss']
})
export class FormFicheNotationComponent extends AutocompletionSearch implements OnInit {

  public readonly title: string = "Fiche de notation";

  todayNumber: number = Date.now();

  // @ts-ignore
  ficheNotationForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder) { 
    super();
    this.userItems = this.route.snapshot.data.allUsers;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.ficheNotationForm = this.formBuilder.group({
      // Étudiant
      nomEtudiant:['', [Validators.required, isStudentValidator(this.userItems)]],

      // Soutenance
      date:['',Validators.required],
      heure:['',Validators.required],

      // Représentant entreprise
      nomRepresentant:['', [Validators.required, isRepresentantValidator(this.userItems)]],

      // Tuteur université 1
      nomTuteur1:['', [Validators.required, isTuteurUniversiteValidator(this.userItems)]],

      // Tuteur université 2
      nomTuteur2:['', [Validators.required, isTuteurUniversiteValidator(this.userItems)]],

      // Commentaire & notation
      commentaire:['',Validators.required],
      note:['', [Validators.required, Validators.min(0), Validators.max(20)]]
    });
  }
  
  onSubmitForm() {
    const formValue = this.ficheNotationForm.value;
    console.log(formValue)
  }
}
