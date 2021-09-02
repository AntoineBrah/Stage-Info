import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class pjService {

  private urlBase: string = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getAllPJ(): Observable<any> {
    return this.httpClient.get(this.urlBase+'/api/piecejointe');
  }
  
  editPJ(id:any, pdf: File):Observable<any>{
    const datastage = new FormData();
    datastage.append('pdf',pdf,pdf.name);
    return this.httpClient.put(this.urlBase+'/api/piecejointe/'+ id, datastage);
  }

  getPJById(id:any): Observable<any> {
    return this.httpClient.get(this.urlBase+'/api/piecejointe/'+id);
  }

  deletePJById(id:any): Observable<any>{
    return this.httpClient.delete(this.urlBase+'/api/piecejointe/'+id);
  }
}
