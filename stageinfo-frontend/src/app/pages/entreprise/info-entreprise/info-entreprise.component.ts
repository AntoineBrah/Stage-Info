import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntrepriseModel } from 'src/app/core/models/EntrepriseModel';



@Component({
  selector: 'app-info-entreprise',
  templateUrl: './info-entreprise.component.html',
  styleUrls: ['./info-entreprise.component.scss']
})
export class InfoEntrepriseComponent implements OnInit {
  title = "Entreprise : Ubisoft Montpellier"
  
  entreprise: EntrepriseModel = new EntrepriseModel();

  // les stages de l'entreprises
  stages = [
    { titre:"Stage Ingénieur SALESFORCE/CPQ", entreprise:"IBM Montpellier", etat:"terminé", date:"2015"},
    { titre:"Pilotage, conception et développement d'applications web.", entreprise:"SMILE", etat:"terminé", date:"2019"},
    { titre:"Administrateur Réseau / Système, Développement soft Interne", entreprise:"EIGHT.TECH", etat:"terminé", date:"2014"},
    { titre:"Stage Ingénieur", entreprise:"IBM Montpellier", etat:"terminé", date:"2015"},
    { titre:"Développeur web.", entreprise:"SMILE", etat:"terminé", date:"2019"}
  ];

  constructor(private route:ActivatedRoute) { }
  
  ngOnInit(): void {
    this.entreprise = this.route.snapshot.data.entreprise;  
  }

}
