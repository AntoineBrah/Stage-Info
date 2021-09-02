import { Component, Input, OnInit } from '@angular/core';
import { NameRoleUser, RoleUser } from 'src/app/core/enums/RoleUser';

@Component({
  selector: 'app-role-badge',
  templateUrl: './role-badge.component.html',
  styleUrls: ['./role-badge.component.scss']
})
export class RoleBadgeComponent implements OnInit {
  @Input() role : string = "";
  constructor() { 
    
  }

  ngOnInit(): void {
  }

  roleColor(role:string):string{
    return "role-"+role;
  }

  fullRoleName(){
    switch (this.role) {
      case RoleUser.INVITE:     return NameRoleUser.INVITE;
      case RoleUser.ETUDIANT:   return NameRoleUser.ETUDIANT;
      case RoleUser.TUTEUR:     return NameRoleUser.TUTEUR;
      case RoleUser.SECRETAIRE: return NameRoleUser.SECRETAIRE;
      case RoleUser.ADMIN:      return NameRoleUser.ADMIN;
      case RoleUser.REPRESENTANT_ENTREPRISE:  return NameRoleUser.REPRESENTANT_ENTREPRISE;
      case RoleUser.RESPONSABLE_PARCOURS:     return NameRoleUser.RESPONSABLE_PARCOURS;
      case RoleUser.RESPONSABLE_STAGES:  return NameRoleUser.RESPONSABLE_STAGES;

      default: return NameRoleUser.UNDEFINED;
    }
  }
}
