import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SoutenanceService } from '../services/soutenance.service';

@Injectable({
  providedIn: 'root'
})
export class AllSoutenancesResolver implements Resolve<any> {
  
  constructor(private soutenanceService : SoutenanceService, private router: Router){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
      return this.soutenanceService.getAllSoutenances().pipe(
        map(res => res),
        catchError((error) => {
          // redirection vers la page d'erreur 404 si le stage n'est pas trouvé
          if(error.status == "404"){
            this.router.navigate(['not-found']);
          }
          return of({ res: null, error: error });
        }),
      );
  }
}
