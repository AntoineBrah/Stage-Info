import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RoleUser } from '../enums/RoleUser';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  private auth: AuthService;
  private router: Router

  constructor(authService: AuthService, private route: Router){
    this.auth = authService;
    this.router = route;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let role = this.auth.getRole();
    const path = route.url[0].path;

    // ---------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------
    // pour les test : si on est administrateur alors le role pris en compte par le guards est le viewRole
    // ---------------------------------------------------------------------------------------------------
    if(this.auth.getRole() == 'admin'){
      role = this.auth.getViewRole();
    }else{
      role = this.auth.getRole();
    }
    // ---------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------------------

    if(this.checkRoleAccess(role, path)) {
      return true;
    }
    else{
      this.router.navigateByUrl('error401');
    }

    return false;
  }

  allRoleButNotInvite = [
    RoleUser.ETUDIANT,
    RoleUser.TUTEUR,
    RoleUser.REPRESENTANT_ENTREPRISE,
    RoleUser.RESPONSABLE_PARCOURS,
    RoleUser.RESPONSABLE_STAGES,
    RoleUser.SECRETAIRE,
    RoleUser.ADMIN,
  ];

  allRole = [
    RoleUser.INVITE,
    RoleUser.ETUDIANT,
    RoleUser.TUTEUR,
    RoleUser.REPRESENTANT_ENTREPRISE,
    RoleUser.RESPONSABLE_PARCOURS,
    RoleUser.RESPONSABLE_STAGES,
    RoleUser.SECRETAIRE,
    RoleUser.ADMIN,
  ];

  checkRoleAccess(role: any, route: string){
    switch(route){
      
      // Tous les roles 
      case 'liste-stages':
      case 'liste-stages/:id':  
      case 'liste-entreprises':
      case 'liste-entreprises/info/:id':
      case 'liste-utilisateurs': 
      case 'profile': 
      case 'liste-utilisateurs/user/:id': 
        return this.allRole.includes(role);

      // Tous les roles à l'exception de l'invité
      case 'saisir-stage':        
        return this.allRoleButNotInvite.includes(role);

      // administrateur
      case 'documentation':    
      case 'liste-etudiants':
      case 'liste-utilisateurs/import-users':
      case 'saisir-fiche-appreciation':
        return [RoleUser.ADMIN].includes(role);

      // administrateur et secrétaire
      case 'liste-soutenances':
      case 'liste-soutenances/add-soutenance':
      case 'liste-soutenances/edit-soutenance':
      case 'liste-soutenances/soutenance':
        return [RoleUser.SECRETAIRE, RoleUser.ADMIN].includes(role);

      // Secretaire, responsable parcours, admin  
      case 'liste-parcours':
      case 'liste-parcours/add-parcours':
      case 'liste-parcours/edit-parcours/:id':
      case 'liste-parcours/info/:id':
      case 'saisir-fiche-notation' :
        return [RoleUser.SECRETAIRE,RoleUser.RESPONSABLE_STAGES, RoleUser.ADMIN].includes(role);
      
      // Etudiant, Secretaire, Responsable stage, admin
      case 'saisir-fiche-suivi' :
        return [RoleUser.ETUDIANT, RoleUser.SECRETAIRE, RoleUser.RESPONSABLE_STAGES, RoleUser.ADMIN].includes(role);

      // Aucun accées pour les autres liens du routerlink
      default:
        return false;
    }
  }

}
