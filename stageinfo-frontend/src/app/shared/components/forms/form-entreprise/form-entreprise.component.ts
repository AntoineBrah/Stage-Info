import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EntrepriseModel } from 'src/app/core/models/EntrepriseModel';

import { EntrepriseService } from 'src/app/core/services/entreprise.service';
import { ActivatedRoute } from '@angular/router';
import { RoleUser } from 'src/app/core/enums/RoleUser';

@Component({
  selector: 'app-form-entreprise',
  templateUrl: './form-entreprise.component.html',
  styleUrls: ['./form-entreprise.component.scss']
})
export class FormEntrepriseComponent implements OnInit {
  @Input() title: string = "";
  @Input() idEntreprise: string="";
  @Input() selectedEntreprise :EntrepriseModel = new EntrepriseModel();
  
  @Input() addEntreprise: boolean = false;
  @Input() editEntreprise: boolean = false;

  @Output() entrepriseEvent = new EventEmitter<EntrepriseModel>();

  entrepriseData: EntrepriseModel = new EntrepriseModel();
  allUsers:any;

  // @ts-ignore
  entrepriseForm: FormGroup;
  // @ts-ignore
  errorMessage: String;

  // pour pouvoir détruire les subscribes
  destroy$: Subject<boolean> = new Subject<boolean>();

  page :number = 1;
  nbMaxPage :number = 4;

  constructor(private formBuilder: FormBuilder, 
              private route:ActivatedRoute,
              private parcoursService: EntrepriseService) { 
    
  this.selectedEntreprise =  new EntrepriseModel();
  this.allUsers = this.route.snapshot.data.allUsers;
  // seulement les representants
  this.allUsers = this.allUsers.filter(((obj: { role: any; }) => obj.role == RoleUser.REPRESENTANT_ENTREPRISE));
  }

  ngOnInit(): void {
    this.initForm();
    if(this.editEntreprise){  // Si on est sur le formulaire edit entreprise alors on remplie les champs
      this.idEntreprise = this.selectedEntreprise._id;
      this.setInputForm(this.selectedEntreprise._id);
    } 
  }


  // lorsque le parcours selectionner à changer :
  ngOnChanges(){
    this.initForm();
    if(this.editEntreprise){  // Si on est sur le formulaire edit entreprise alors on remplie les champs
      this.idEntreprise = this.selectedEntreprise._id;
      this.setInputForm(this.selectedEntreprise._id);
    } 
  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  initForm(){
    this.entrepriseForm = this.formBuilder.group({
      nom:['',Validators.required],
      secteurActivite:['',Validators.required],
      description:['',Validators.required],

      voie:['',Validators.required],
      codePostal:['', [Validators.required ]], //Validators.pattern('/^(?:[0-8]\d|9[0-8])\d{3}$/')
      ville:['', Validators.required],
      pays:['', Validators.required],

      siteweb:[''],
      tel:[''],
      fax:[''],
      siret:['', Validators.required],
      nbSalaries:['', Validators.required],
      chiffreAffaire:['', Validators.required],
      representant:[null, Validators.required],
    });
  }

  setInputForm(id:any){
    // récupération des données du parcours
    this.parcoursService.getEntrepriseById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_entreprise: any) => {
        this.entrepriseData = _entreprise;
        // On set les données du parcours dans le formulaire
        this.entrepriseForm.patchValue({
          nom:this.entrepriseData.nom,
          secteurActivite:this.entrepriseData.secteurActivite,
          description:this.entrepriseData.description,
/*
          voie:this.entrepriseData.adresse.voie,
          codePostal:this.entrepriseData.adresse.codePostal,
          ville:this.entrepriseData.adresse.ville,
          pays:this.entrepriseData.adresse.pays,
*/
          voie:this.entrepriseData.voie,
          codePostal:this.entrepriseData.codePostal,
          ville:this.entrepriseData.ville,
          pays:this.entrepriseData.pays,
         
          siteweb:this.entrepriseData.siteweb,
          tel:this.entrepriseData.tel,
          fax:this.entrepriseData.fax,
          siret:this.entrepriseData.siret,
          nbSalaries:this.entrepriseData.nbSalaries,
          chiffreAffaire:this.entrepriseData.chiffreAffaire,
          representant:this.entrepriseData.representant?._id,
        });
      });
    }

  onSubmitForm() {
      const formValue = this.entrepriseForm.value;
      const entreprise = new EntrepriseModel(
        this.idEntreprise,
        formValue['nom'],
        formValue['secteurActivite'],
        formValue['description'],       
        formValue['voie'],
        formValue['codePostal'],
        formValue['ville'],
        formValue['pays'],
      

        formValue['siteweb'],
        formValue['tel'],
        formValue['fax'],
        
        formValue['siret'],
        formValue['nbSalaries'],
        
        formValue['chiffreAffaire'],
        formValue['representant']);
      
      if(this.addEntreprise){
        this.ajouterEntreprise(entreprise);
      }else {
        //alors on est dans editParcours
        this.modifierEntreprise(this.idEntreprise, entreprise);
      }
    }


  ajouterEntreprise(entreprise:any){
    this.parcoursService.addEntreprise(entreprise)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any) => {
        console.log("Entreprise : "+ entreprise.nom +" ajouté sur la plateforme !");
        this.onReset(); // on reset les données dans le forumulaire
        
        entreprise._id = _res.idEntreprise;
        // On met place les infos du representant dans le tableau entreprise local
        var idRep = entreprise.representant;
        var index = this.allUsers.findIndex(((obj: { _id: any; }) => obj._id == idRep));
        console.log(this.allUsers)
        entreprise.representant = { 
          _id:idRep, 
          nom:this.allUsers[index]?.nom,
          prenom:this.allUsers[index]?.prenom
        }
        this.entrepriseEvent.emit(entreprise);
    });
  }

  modifierEntreprise(id:any, entreprise:any){
    
    this.parcoursService.editEntreprise(id, entreprise)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any[]) => {
        console.log("Entreprise : "+ entreprise.nom +" modifié !");

        // On met place les infos du representant dans le tableau entreprise local
        var idRep = entreprise.representant;
        var index = this.allUsers.findIndex(((obj: { _id: any; }) => obj._id == idRep));
        console.log(this.allUsers)
        entreprise.representant = { 
          _id:idRep, 
          nom:this.allUsers[index]?.nom,
          prenom:this.allUsers[index]?.prenom
        }
        this.onReset(); // on reset les données dans le forumulaire
        this.entrepriseEvent.emit(entreprise); // on envoie l'entreprise dans le component parent
    });
  }

  onReset(){
    this.entrepriseForm.reset(); 
  }

  displayFielset(theme : string) : boolean{
    switch (theme) {
      case "entreprise": //page 1
        return this.page === 1 ? true : false;
      case "adresse": // page 2
        return this.page === 2 ? true : false;
      case "contact": // page 3
        return this.page === 3 ? true : false;
      case "informations": // page 4
        return this.page === 4 ? true : false;
      default:
        return false;
    }
  }

  isDone(theme : string) : boolean{
    switch (theme) {
      case "entreprise": //page 1
        return this.page >= 1 ? true : false;
      case "adresse": // page 2
        return this.page >= 2 ? true : false;
      case "contact": // page 3
        return this.page >= 3 ? true : false;
      case "informations": // page 4
        return this.page >= 4 ? true : false;
      default:
        return false;
    }
  }


  // Fonction qui permet de retourner true ou false pour pouvoir dire si on peut passé à la suite (bouton next)
  disabledNext() : boolean{
    switch (this.page) {
      case 1: //page 1 entreprise
        if( this.entrepriseForm.get('nom').invalid || 
            this.entrepriseForm.get('secteurActivite').invalid){
          return true;
        }else{
          return false;
        }
        
      case 2: // page 2 adresse
        if( this.entrepriseForm.get('voie').invalid || 
            this.entrepriseForm.get('codePostal').invalid ||
            this.entrepriseForm.get('ville').invalid ||
            this.entrepriseForm.get('pays').invalid){
          return true;
        }else{
          return false;
        }
      case 3: // page 3 contact
        // les informations de contact sont facultative
        return false; 
      case 4: // page 4 informations
        // les informations de contact sont facultative
        return false;
      default:
        return false;
    }
  }

  next(){
    if(this.page < this.nbMaxPage){
      this.page++;
    }
  }
  pred(){
    if(this.page > 1){
      this.page--;
    }
  }

  lastPage() :boolean {
    if(this.page == this.nbMaxPage){
      return true;
    }else{
      return false;
    }
  }
  firstPage() :boolean {
    if(this.page <= 1){
      return true;
    }else{
      return false;
    }
  }

}
