import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

import { AuthService } from "../services/auth.service";
import { UserModel } from '../../core/models/UserModel';
import { NameRoleUser, RoleUser } from '../enums/RoleUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() onlyTitle = false;
  @Input() showSidebar = true;
  @Output() sidebarEvent = new EventEmitter<boolean>();

  public user: UserModel | undefined;
  public isAuth: boolean | undefined;
  private isAuthSub: Subscription | undefined;

  public allRoles = [
    RoleUser.INVITE,
    RoleUser.ETUDIANT,
    RoleUser.TUTEUR,
    RoleUser.REPRESENTANT_ENTREPRISE,
    RoleUser.RESPONSABLE_PARCOURS,
    RoleUser.SECRETAIRE,
    RoleUser.RESPONSABLE_STAGES,
    RoleUser.ADMIN,
  ];

  public allNamesRoles = [
    NameRoleUser.INVITE,
    NameRoleUser.ETUDIANT,
    NameRoleUser.TUTEUR,
    NameRoleUser.REPRESENTANT_ENTREPRISE,
    NameRoleUser.RESPONSABLE_PARCOURS,
    NameRoleUser.SECRETAIRE,
    NameRoleUser.RESPONSABLE_STAGES,
    NameRoleUser.ADMIN,
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthSub = this.authService.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      });
  }

  ngOnDestroy() {
    this.isAuthSub?.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  changeDisplaySidebar() {
    this.showSidebar = !this.showSidebar;
    this.sidebarEvent.emit(this.showSidebar);
  }

  // Fonction qui indique si l'utilisateur connecté à la plateforme est administrateur
  isAdmin():boolean{
    return this.getRole() == RoleUser.ADMIN;
  }

  // Fonction qui recupère le role de l'utilisateur connecté
  getRole():any{
    return this.authService.getRole();
  }
  // Fonction qui recupère l'email de l'utilisateur connecté
  getEmail(){
    return this.authService.getEmail();
  }

  // Fonction qui recupère le role fictif qui permet à l'utilisateur de tester la vue des rôles
  getViewRole():any{ // on recupère le role de test
    return this.authService.getViewRole();
  }

  // Récupère le booleen qui indique si le bouton switch est true ou false
  getSwitch():boolean{
    return this.authService.getViewAllRoute();
  }

  // Change la valeur du switch qui se trouve dans le header
  changeSwitch(){
    this.authService.changeViewAllRoute();
  }

  setViewRole(role:RoleUser){
    this.authService.setViewRole(role);
  }

  nameRole(role:RoleUser):any{
    switch (role) {
      case RoleUser.INVITE:                   return NameRoleUser.INVITE;
      case RoleUser.ETUDIANT:                 return NameRoleUser.ETUDIANT;
      case RoleUser.TUTEUR:                   return NameRoleUser.TUTEUR;
      case RoleUser.SECRETAIRE:               return NameRoleUser.SECRETAIRE;
      case RoleUser.ADMIN:                    return NameRoleUser.ADMIN;
      case RoleUser.REPRESENTANT_ENTREPRISE:  return NameRoleUser.REPRESENTANT_ENTREPRISE;
      case RoleUser.RESPONSABLE_PARCOURS:     return NameRoleUser.RESPONSABLE_PARCOURS;
      case RoleUser.RESPONSABLE_STAGES:       return NameRoleUser.RESPONSABLE_STAGES;

      default:                                return NameRoleUser.UNDEFINED;
    }
  }

  nameViewRole():any{
    switch (this.getViewRole()) {
      case RoleUser.INVITE:                   return NameRoleUser.INVITE;
      case RoleUser.ETUDIANT:                 return NameRoleUser.ETUDIANT;
      case RoleUser.TUTEUR:                   return NameRoleUser.TUTEUR;
      case RoleUser.SECRETAIRE:               return NameRoleUser.SECRETAIRE;
      case RoleUser.ADMIN:                    return NameRoleUser.ADMIN;
      case RoleUser.REPRESENTANT_ENTREPRISE:  return NameRoleUser.REPRESENTANT_ENTREPRISE;
      case RoleUser.RESPONSABLE_PARCOURS:     return NameRoleUser.RESPONSABLE_PARCOURS;
      case RoleUser.RESPONSABLE_STAGES:       return NameRoleUser.RESPONSABLE_STAGES;

      default:                                return NameRoleUser.UNDEFINED;
    }
  }
}

