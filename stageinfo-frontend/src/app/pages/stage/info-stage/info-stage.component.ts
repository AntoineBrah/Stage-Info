import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RoleUser } from 'src/app/core/enums/RoleUser';
import { AuthService } from 'src/app/core/services/auth.service';
import { StageService } from 'src/app/core/services/stage.service';
import { pjService } from "../../../core/services/pj.service";
import {TypePJ} from "../../../core/enums/TypePJ";
import {
  isRepresentantValidator,
  isStudentValidator,
  isTuteurUniversiteValidator
} from "../../../core/validators/validators";
import { EtatStage } from 'src/app/core/enums/EtatStage';

@Component({
  selector: 'app-info-stage',
  templateUrl: './info-stage.component.html',
  styleUrls: ['./info-stage.component.scss']
})
export class InfoStageComponent implements OnInit, OnDestroy {
  stage : any;
  allUsers:any;
  afuConfig = {
    uploadAPI: {
      url:"http://localhost:3000/upload"
    }
  };
  lien: any;
  //fiche de notation
  todayNumber: number = Date.now();
  // @ts-ignore
  ficheNotationForm: FormGroup;

  // variables pour le download/upload de fichiers
  pdf : any;
  uploaded = false;
  pj : Array<any> = new Array();
  // pour pouvoir détruire les subscribes
  destroy$: Subject<boolean> = new Subject<boolean>();
  errorMessage: boolean = false;
  type = [TypePJ.Descriptif, TypePJ.Rapport, TypePJ.Rapport_çonfidentiel,TypePJ.Convention];
  alert: any;
  Select=document.getElementById('typePj');

  selectPieceJointe:any; // piece jointe qui est selectionné
  selectComment:any;

  // formulaire d'ajout de commentaire sur le stage
  // @ts-ignore
  commentaireForm: FormGroup;
  // @ts-ignore
  PjForm: FormGroup
  // @ts-ignore
  errorMessage: String;

  constructor(private formBuilder: FormBuilder,
              private route:ActivatedRoute,
              private stageService: StageService,
              private authService: AuthService,
              private pjService : pjService) {
                this.allUsers = this.route.snapshot.data.allUsers;
              }

  ngOnInit(): void {
    this.initFormComment();
    this.initFormPj();
    this.initFormNote();
    this.stage = this.route.snapshot.data.stage;
    console.log(this.stage);

    var index = this.allUsers.findIndex(((obj: { _id: any; }) => obj._id == this.stage.entreprise?.representant));
    this.stage.entreprise.representant = {
      _id: this.stage.entreprise?.representant,
      nom: this.allUsers[index]?.nom,
      prenom: this.allUsers[index]?.prenom
    }
  }

  initFormPj(){
    this.PjForm = this.formBuilder.group({
      typePj:['',Validators.required]
    });
  }
  initFormNote(){
    this.ficheNotationForm = this.formBuilder.group({

      commentaire:['',Validators.required],
      note:['', [Validators.required, Validators.min(0), Validators.max(20)]]
    });
  }
  initFormComment(){
    this.commentaireForm = this.formBuilder.group({
      commentaire:['',Validators.required]

    });
  }

  selectedPieceJointe(item:any){
    this.selectPieceJointe = item;
  }

  selectedComment(item:any){
    this.selectComment = item;
  }

  displaySectionEncadrant():boolean{
    return this.stage.tuteur;
  }
  canEditNote():boolean{
    if(this.stage?.etat == EtatStage.AFFECT_RAPPORTEUR){
      switch (this.authService.getViewRole()) {
        case RoleUser.INVITE:
        case RoleUser.ETUDIANT:
        case RoleUser.RESPONSABLE_PARCOURS:
        case RoleUser.SECRETAIRE:
        case RoleUser.RESPONSABLE_STAGES:
        case RoleUser.REPRESENTANT_ENTREPRISE:
  
          return false;
        case RoleUser.TUTEUR:
        case RoleUser.ADMIN:
          return true;
        default:
          return false;
      }
    }else{
      return false;
    }
  }

  canEditStage():boolean{
    switch (this.authService.getViewRole()) {
      case RoleUser.INVITE:
      case RoleUser.ETUDIANT:
      case RoleUser.TUTEUR:
      case RoleUser.REPRESENTANT_ENTREPRISE:

        return false;

      case RoleUser.RESPONSABLE_PARCOURS:
      case RoleUser.SECRETAIRE:
      case RoleUser.RESPONSABLE_STAGES:
      case RoleUser.ADMIN:
        return true;
      default:
        return false;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


  fileChoosen(event: any) {
    if(event.target.value){
      this.pdf=<File>event.target.files[0];
      this.uploaded =true;
      console.log(this.pdf);
    }
  }
  onSubmitAddFiles(){
    const p = this.PjForm.value;
    this.ajouterFichier(p['typePj']);

  }

  ajouterCommentaire(){
    const formValue = this.commentaireForm.value;
    var comment :any = {
      idStage: this.stage._id,
      idUser: this.authService.getUserId(),
      dateCommentaire: new Date(),
      message: formValue['commentaire'],
    };
    this.stageService.addCommentOnStage(this.stage._id, comment)
      .pipe(takeUntil(this.destroy$))
        .subscribe((_res: any) => {
          console.log("Nouveau commentaire !");
          comment._id = _res?._id;
          this.stage.commentaires.push(comment);
          this.commentaireForm.reset();
        });
  }

  supprimerCommentaire(id:any){
    this.stageService.deleteCommentOnStage(this.stage._id, id)
      .pipe(takeUntil(this.destroy$))
        .subscribe((_res: any) => {
          console.log("Suppression du commentaire!");
          this.stage.commentaires = this.stage.commentaires.filter((object: { _id: any; }) => { return object._id != id; });
        });
  }

  getCommentAuthor(idUser:any){
    var index = this.allUsers.findIndex(((obj: { _id: any; }) => obj._id == idUser));
    return this.allUsers[index]?.nom + " " + this.allUsers[index]?.prenom;
  }

  ajouterFichier(ty:any){
    // @ts-ignore

    this.stageService.addPdf(this.stage._id, this.pdf,ty)
        .pipe(takeUntil(this.destroy$))
        .subscribe((_res: any) => {
          // @ts-ignore
          console.log("Stage : "+ ty + " modifié !");
          this.alert= "Fichier ajoutée!";
        });
  }

  modifierFichier(_id: any) {
    if(this.uploaded) {
      this.pjService.editPJ(_id, this.pdf).pipe(takeUntil(this.destroy$))
        .subscribe((_res: any) => {
          console.log("Stage : " + this.stage.titre + " modifié !");
          this.alert= "Fichier modifié!";
        });
    }
    else{
      this.errorMessage=true
    }

  }

  supprimerFichier(id: any) {
    this.pjService.deletePJById(id).pipe(takeUntil(this.destroy$))
      .subscribe((_res: any) => {
        this.alert="Fichier supprimé!";
        // On supprime la pièce jointe du tableau local des fichier (on sait qu'il est supprimer de la base de donnée donc on peut le supprimer sans recharger les données distantes)
        this.stage.fichier = this.stage.fichier.filter((object: { _id: any; }) => { return object._id != id; });
      });
  }
  onSubmitForm() {
    const formValue = this.ficheNotationForm.value;
    const resulta = {commentaire : formValue.commentaire,note: formValue.note,id_stage:this.stage._id,id_user: this.authService.getUserId()}
    console.log(resulta)
    console.log(this.stage._id)
    console.log(this.authService.getViewRole() == RoleUser.TUTEUR)
    this.stageService.addNote(this.stage._id,formValue.note,formValue.commentaire)
      .subscribe((_res: any) => {
        this.alert="note rajoutée";

      });
  }
}

