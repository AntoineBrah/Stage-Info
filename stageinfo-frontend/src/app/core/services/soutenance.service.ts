import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoutenanceService {

  private urlBase: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getAllSoutenances(): Observable<any> {
    return this.httpClient.get(this.urlBase+'/api/soutenance');
  }

  getSoutenanceById(id:any): Observable<any> {
    return this.httpClient.get(this.urlBase+'/api/soutenance/'+id);
  }

  deleteSoutenanceById(id:any): Observable<any>{
    return this.httpClient.delete(this.urlBase+'/api/soutenance/'+id);
  }
}
