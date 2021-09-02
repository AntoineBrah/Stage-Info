import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { StageModel } from '../models/StageModel';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class StageService {

  private urlBase: string = 'http://localhost:3000';

  private role:string = 'invite';

  constructor(private httpClient: HttpClient,
              private authservice: AuthService) { }


  /* Récupération de tous les stages */
  getAllStages(): Observable<any> {
    return this.httpClient.get(this.urlBase+'/api/stage');
  }

  /* Récupération d'un stage avec l'identifiant du stage */
  getStageById(id:any): Observable<any> {
    return this.httpClient.get(this.urlBase+'/api/stage/'+id);
  }
  /* On récupère tous les stages qui ont un lien avec l'id user (ajouteur, tuteur, etudiant ...) */
  getAllStageRelatedUser(id:any): Observable<any> {
    return this.httpClient.get(this.urlBase+'/api/stage/related/'+id);
  }

  /* Ajouter un stage */
  addStage(stage: StageModel) :Observable<any>{
    return this.httpClient.post(this.urlBase+'/api/stage', stage);
  }


  addStageAvecFichier(data:StageModel, pdf: File):Observable<any>{
    const datastage = new FormData();
    datastage.append('data',JSON.stringify(data));
    datastage.append('pdf',pdf,data.titre);
    return this.httpClient.post(this.urlBase+'/api/stage', datastage);
  }

  /* Modifier un stage */
  editStage(id:any, data:StageModel):Observable<any>{
    return this.httpClient.put(this.urlBase+'/api/stage/'+ id, data);
  }

  /* changer l'état d'un stage */
  editState(id:any, state:string, data:any=""):Observable<any>{
    var newState;
    if(!data){ // si data n'est pas spécifié (data contient les modifications à apporter donc la date/user en plus)
      newState = {
        etat: state
      };
    }else{
      newState = data;
    }

    console.log({message:'nouvel etat : ', etat: newState})
    return this.httpClient.put(this.urlBase+'/api/stage/'+ id+'/changement-etat', newState);
  }

  /* Suppression d'un stage en passant l'identifiant en paramètre */
  deleteStageById(id:any): Observable<any>{
    return this.httpClient.delete(this.urlBase+'/api/stage/'+id);
  }

  // -----------------------------
  // -- Commentaires de stage ----
  // -----------------------------

  /**
   * Ajouter un commentaire sur le stage
   * @param id
   * @param data
   * @returns Observable
   */
  addCommentOnStage(id:any, data:any):Observable<any>{
    return this.httpClient.put(this.urlBase+'/api/stage/'+ id +'/comment', data);
  }

  /**
   * Supprimer un commentaire en fonction de son id
   * @param idStage identifiant du stage sur lequelle se trouve le commentaire
   * @param idComment identifiant du commentaire à supprimer
   * @returns Observable
   */
  deleteCommentOnStage(idStage:any, idComment:any): Observable<any>{
    return this.httpClient.delete(this.urlBase+'/api/stage/'+idStage+'/comment/'+idComment);
  }

  // -----------------------------
  // -- Pièce jointe de stage ----
  // -----------------------------


  editStageWithPdf(id:any, data:StageModel,pdf :File):Observable<any>{
    const datastage = new FormData();
    datastage.append('data',JSON.stringify(data));
    datastage.append('pdf',pdf,data.titre);
    return this.httpClient.put(this.urlBase+'/api/stage/'+ id,datastage );
  }

  addPdf(id:any,pdf:File,Type:any):Observable<any>{
    const datastage = new FormData();
    datastage.append('pdf',pdf,pdf.name);
    datastage.append('type',Type);
    datastage.append('data',JSON.stringify(({idUser:this.authservice.getUserId()})))
    return this.httpClient.put(this.urlBase+'/api/stage/'+ id+'/add-pj',datastage );
  }
  addNote(id:any,note:any,commentaire:any):Observable<any>{
    const datastage = {valeur:note,commentaire:commentaire};
    return this.httpClient.put(this.urlBase+'/api/stage/'+ id+'/add-note',datastage)
  }
}
