import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParcoursModel } from '../models/ParcoursModel';

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Methods": "GET,POST",	  
    "Access-Control-Allow-Headers": "Content-type",  
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  })
};

@Injectable({
  providedIn: 'root'
})
export class ParcoursService {

  private urlBase: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  /* Récupération de tous les parcours */
  getAllParcours(): Observable<any> {
    return this.httpClient.get(this.urlBase+'/api/parcours');
  }

  /* Récupération d'un parcours avec son identifiant */
  getParcoursById(id:any): Observable<any> {
    return this.httpClient.get(this.urlBase+'/api/parcours/'+id);
  }

  /* Ajouter un parcours */
  addParcours(data:ParcoursModel):Observable<any>{
    return this.httpClient.post(this.urlBase+'/api/parcours/', data); 
  }

  /* Modifier un parcours */
  editParcours(id:any, data:ParcoursModel):Observable<any>{
    return this.httpClient.put(this.urlBase+'/api/parcours/'+ id, data);
  }
  
  /* Suppression d'un parcours avec son identifiant */
  deleteParcoursById(id:any): Observable<any>{
      return this.httpClient.delete(this.urlBase+'/api/parcours/'+id);
  }

}
