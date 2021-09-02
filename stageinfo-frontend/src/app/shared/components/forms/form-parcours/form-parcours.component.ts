import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ParcoursModel } from 'src/app/core/models/ParcoursModel';
import { ParcoursService } from 'src/app/core/services/parcours.service';

@Component({
  selector: 'app-form-parcours',
  templateUrl: './form-parcours.component.html',
  styleUrls: ['./form-parcours.component.scss']
})
export class FormParcoursComponent implements OnInit, OnChanges {
  @Input() title: string ="";

  @Input() idParcours: string="";
  @Input() selectedParcours :ParcoursModel = new ParcoursModel();
  @Output() parcoursEvent = new EventEmitter<ParcoursModel>();

  @Input() addParcours: boolean=false;
  @Input() editParcours: boolean=false;


  parcoursData: ParcoursModel = new ParcoursModel();
  allResponsable: any;
  // @ts-ignore
  parcoursForm: FormGroup;
  // @ts-ignore
  errorMessage: String;

  isError:boolean = false;

  // pour pouvoir détruire les subscribes
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder: FormBuilder, 
              private route: ActivatedRoute,
              private router: Router,
              private parcoursService: ParcoursService) { 
    this.allResponsable = this.route.snapshot.data.allResponsables;
    console.log(this.allResponsable);
    this.selectedParcours =  new ParcoursModel();
  }

  ngOnInit() {
    this.initForm();
    if(this.editParcours){  // Si on est sur le formulaire edit parcours alors on remplie les champs
      this.idParcours = this.selectedParcours._id;
      this.setInputForm(this.selectedParcours._id);
    } 
  }

  // lorsque le parcours selectionner à changer :
  ngOnChanges(){
    this.initForm();
    if(this.editParcours){  // Si on est sur le formulaire edit parcours alors on remplie les champs
      this.idParcours = this.selectedParcours._id;
      this.setInputForm(this.selectedParcours._id);
    } 
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  initForm(){
    this.parcoursForm = this.formBuilder.group({
      acronyme:['',Validators.required],
      niveau:['',Validators.required],
      intitule:['',Validators.required],
      description:[''],
      responsable:[null, Validators.required]
    });
  }

  setInputForm(id:any){
  // récupération des données du parcours
  this.parcoursService.getParcoursById(id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((_parcours: ParcoursModel) => {
      this.parcoursData = _parcours;
      // On set les données du parcours dans le formulaire
      this.parcoursForm.patchValue({
        acronyme:this.parcoursData.acronyme,
        niveau:this.parcoursData.niveau,
        intitule:this.parcoursData.intitule,
        description:this.parcoursData.description,
        responsable:this.parcoursData.responsable?._id
      });
    });
  }

  onSubmitForm() {
    if(!this.validator()){
      this.isError = true;
    }else{
      this.isError = false;
      const formValue = this.parcoursForm.value;
      const parcours = new ParcoursModel(
        this.idParcours,
        formValue['acronyme'],
        formValue['niveau'],
        formValue['intitule'],
        formValue['description'],
        formValue['responsable']
      );
      
      if(this.addParcours){
        this.ajouterParcours(parcours);
      }else {
        //alors on est dans editParcours
        this.modifierParcours(this.idParcours, parcours);
      }
      
    }
  }

  ajouterParcours(parcours:any){
    this.parcoursService.addParcours(parcours)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any) => {
        console.log("Parcours : "+ parcours.acronyme + " ajouté à la plateforme !");
        this.parcoursForm.reset();  // on reset les données dans le forumulaire

        parcours._id = _res.idParcours;
        // On met place les infos du responsable dans le tableau parcours
        var idResp = parcours.responsable;
        var index = this.allResponsable.findIndex(((obj: { _id: any; }) => obj._id == idResp));
      
        parcours.responsable = { 
          _id:idResp, 
          nom:this.allResponsable[index]?.nom,
          prenom:this.allResponsable[index]?.prenom
        }
        this.parcoursEvent.emit(parcours); // on envoie le parcours dans le component parent
        this.parcoursForm.reset(); 
      });
  }

  modifierParcours(id:any, parcours:ParcoursModel){
    this.parcoursService.editParcours(id, parcours)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: ParcoursModel[]) => {
        console.log("Parcours : "+ parcours.acronyme + " modifié !");
        this.parcoursForm.reset(); // on reset les données dans le forumulaire
        console.log(parcours)
        // On met place les infos du responsable dans le tableau parcours
        var idResp = parcours.responsable;
        var index = this.allResponsable.findIndex(((obj: { _id: any; }) => obj._id == idResp));
      
        parcours.responsable = { 
          _id:idResp, 
          nom:this.allResponsable[index]?.nom,
          prenom:this.allResponsable[index]?.prenom
        }

        console.log(parcours);
        this.parcoursEvent.emit(parcours); // on envoie le parcours dans le component parent
        this.parcoursForm.reset(); 
      });
  }

  get parcoursFormControl() {
    return this.parcoursForm.controls;
  }

  displayValidationSelectStyle(input:any): any{
    if(this.isError && input.invalid){
      return  'custom-select is-invalid';
    }else if(this.isError){
      return 'custom-select is-valid';
    }else{
      return 'custom-select ';
    }
  }

  displayValidationInputStyle(input:any): any{
    if(this.isError && input.invalid){
      return  'form-control is-invalid';
    }else if(this.isError){
      return 'form-control is-valid';
    }else{
      return 'form-control';
    }
  }

    // Fonction qui permet de retourner true ou false pour pouvoir dire si on peut passé à la suite (bouton next)
    validator() : boolean{
          if( this.parcoursFormControl.acronyme.invalid || 
            this.parcoursFormControl.niveau.invalid ||
            this.parcoursFormControl.intitule.invalid ||
            this.parcoursFormControl.responsable.invalid
            ){
            return false;
          }else{
            return true;
          }
          
    }

}
