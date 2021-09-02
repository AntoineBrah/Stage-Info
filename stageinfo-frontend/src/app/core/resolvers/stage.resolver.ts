import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, startWith } from 'rxjs/operators';

import { StageService } from '../services/stage.service';

@Injectable({
  providedIn: 'root'
})
export class StageResolver implements Resolve<any> {

  constructor(private stageService : StageService, private router: Router){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
    // La variable loading permet de savoir lorsque les données sont en cours de chargement
      return this.stageService.getStageById(route.paramMap.get('id')).pipe(
        
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
