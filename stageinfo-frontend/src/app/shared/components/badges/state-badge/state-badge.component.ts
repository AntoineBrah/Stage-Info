import { Component, Input, OnInit } from '@angular/core';
import { EtatStage, NameEtatStage } from 'src/app/core/enums/EtatStage';

@Component({
  selector: 'app-state-badge',
  templateUrl: './state-badge.component.html',
  styleUrls: ['./state-badge.component.scss']
})
export class StateBadgeComponent implements OnInit {
  @Input() state : string = "";
  @Input() reduce : boolean = false;
  constructor() { 
    
  }

  ngOnInit(): void {
  }

  stateColor(state:string):string{
    return "state-"+state;
  }

  fullStateName(){
    switch (this.state) {
      case EtatStage.VALIDE:  return NameEtatStage.VALIDE;
      case EtatStage.PROPOSE: return NameEtatStage.PROPOSE;
      case EtatStage.REFUSE:  return NameEtatStage.REFUSE;
      case EtatStage.TERMINE: return NameEtatStage.TERMINE;
      case EtatStage.RESERVE: return NameEtatStage.RESERVE;
      case EtatStage.AFFECT_ETUDIANT:   return NameEtatStage.AFFECT_ETUDIANT;
      case EtatStage.AFFECT_TUTEUR:     return NameEtatStage.AFFECT_TUTEUR;
      case EtatStage.AFFECT_RAPPORTEUR: return NameEtatStage.AFFECT_RAPPORTEUR;
    
      default:
        return "Non définie";
    }
  }
}
