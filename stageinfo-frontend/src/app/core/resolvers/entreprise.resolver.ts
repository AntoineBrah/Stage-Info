import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EntrepriseService } from '../services/entreprise.service';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseResolver implements Resolve<any> {
  
  constructor(private entrepriseService : EntrepriseService, private router: Router){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
    // La variable loading permet de savoir lorsque les données sont en cours de chargement
      return this.entrepriseService.getEntrepriseById(route.paramMap.get('id')).pipe(
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
