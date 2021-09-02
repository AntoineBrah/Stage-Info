import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, Form } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AutocompletionSearch } from 'src/app/shared/classes/autocompletion-search';
import { isStudentValidator } from 'src/app/core/validators/validators';


@Component({
  selector: 'app-form-fiche-suivi',
  templateUrl: './form-fiche-suivi.component.html',
  styleUrls: ['./form-fiche-suivi.component.scss']
})
export class FormFicheSuiviComponent extends AutocompletionSearch implements OnInit {

  public readonly title: string = "Fiche de suivi";
  niveau = ["M2", "M1", "L3"];
  contact = ["Téléphone", "Mail", "Visite"];
  reponseBinaire = ['Oui', 'Non'];
  allParcours:any;
  allUsers: Array<any>;

  public model: any;

  todayNumber: number = Date.now();

  // @ts-ignore
  ficheSuiviForm: FormGroup;
  contactItems = new FormArray([]);

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder) { 
    super();
    this.allParcours = this.route.snapshot.data.allParcours;
    this.allUsers = this.route.snapshot.data.allUsers;
    this.userItems = this.allUsers;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.ficheSuiviForm = this.formBuilder.group({
      // Informations générales
      nom:['', [Validators.required, isStudentValidator(this.allUsers)]],
      parcours:['',Validators.required],
      niveau:['',Validators.required],
      tuteur:['',Validators.required],
      responsable:['',Validators.required],

      // Les échanges
      contactItems: this.formBuilder.array([this.createContactItem()]),
      
      // Bilan stage
      dateDebut:['', Validators.required],
      dateFin:['', Validators.required],
      bilan:['', Validators.required],
      embauche:['', Validators.required]
    });
  }

  get contactItemsSection() {
    return this.ficheSuiviForm.get('contactItems') as FormArray
  }

  addContactItem(): void {
    this.contactItems = this.ficheSuiviForm.get('contactItems') as FormArray;
    console.log(this.contactItems.value);

    let champsRemplis = true;

    for(let item of this.contactItems.value){
      if(item.dateVisite==="" || item.typeContact==="" || item.commentaire==="")
        champsRemplis = false;
    }

    if(champsRemplis)
      this.contactItems.push(this.createContactItem());
    else
      alert('Vous devez remplir tous les champs précédents avant de pouvoir en ajouter d\'autres'); /* C'est temporaire on fera un truc mieux plus tard */
  }

  removeContactItem() {
    this.contactItems = this.ficheSuiviForm.get('contactItems') as FormArray;

    if(this.contactItems.length > 1)
      this.contactItems.removeAt(-1);
    else
      alert('Vous ne pouvez pas supprimer tous les items de contact !'); /* C'est temporaire on fera un truc mieux plus tard */
  }

  createContactItem(): FormGroup {
    return this.formBuilder.group({
      dateVisite:['',Validators.required],
      typeContact:['', Validators.required],
      commentaire:['', Validators.required]
    });
  }
  
  onSubmitForm() {
    const formValue = this.ficheSuiviForm.value;
    console.log(formValue)
  }
}
