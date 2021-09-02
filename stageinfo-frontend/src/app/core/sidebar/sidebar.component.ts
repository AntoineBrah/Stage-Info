import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {Subscription} from "rxjs";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import { RoleUser } from '../enums/RoleUser';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() sidebarEvent = new EventEmitter<boolean>();
  @Input() showSidebar = true;

  changeDisplaySidebar() {
    this.showSidebar = !this.showSidebar;
    this.sidebarEvent.emit(this.showSidebar);
  }

  closeSideBar(){
    // si la sidebar est celle qui cache le contenu alors (responsive)
    if(window.innerWidth <800){
      this.showSidebar = false;
      this.sidebarEvent.emit(this.showSidebar);
    }
  }

  // -----------------------------------------------------------------------------------------------
  // ------- On défini tous les liens possibles de navigation --------------------------------------
  // --- (les objets ci-dessous contiennt l'icon, le nom et le lien) -------------------------------
  //-----(il y a aussi un tableau d'item dans le cas où on souhaite avoir un lien dropdown) --------
  // -----------------------------------------------------------------------------------------------
  mesStages = {icon:"fas fa-clipboard-list",          nom:"Mes stages",       lien:"/mes-stages",       items:[]};

  listeStages =             {icon:"fas fa-list",          nom:"Listing des stages",       lien:"/liste-stages",       items:[]};
  listeSoutenances =        {icon:"fas fa-list",          nom:"Listing des soutenances",  lien:"/liste-soutenances",   items:[]};
  listeEntreprise =         {icon:"fas fa-list",          nom:"Listing des entreprises",  lien:"/liste-entreprises",   items:[]};
  voirLesEntreprise =       {icon:"fas fa-list",          nom:"Voir les entreprises",  lien:"/liste-entreprises",   items:[]};
  listeUtilisateurs =       {icon:"fas fa-list",          nom:"Listing des utilisateurs", lien:"/liste-utilisateurs",   items:[]};
  listeEtudiants =          {icon:"fas fa-list",          nom:"Listing des étudiants ",   lien:"/liste-etudiants", items:[]};
  listeEnseignants =        {icon:"fas fa-list",          nom:"listing des enseignants",  lien:"/liste-enseignants", items:[]};
  listeParcours =           {icon:"fas fa-list",          nom:"Listing des parcours",     lien:"/liste-parcours",       items:[]};
  listeEtudiantsSansStage = {icon:"fas fa-user-friends",  nom:"Étudiant sans stages",     lien:"/etudiant-sans-stages", items:[]};
  listeSoutenancesNonPlanifie = {icon:"fas fa-list",      nom:"Listing des soutenances non planifiées", lien:"/listing-soutenance-non-planifie", items:[]};

  planningSoutenance =      {icon:"fas fa-calendar-alt",  nom:"Planning de soutenance",    lien:"/planning-soutenance", items:[]};
  notesStage =              {icon:"fas fa-table",         nom:"Les notes des stages",     lien:"/note-de-stage", items:[]};

  saisirStage =             {icon:"fas fa-pencil-alt",    nom:"Proposer un stage",        lien:"/saisir-stage", items:[]};
  saisirFicheSuivi =        {icon:"fas fa-pencil-alt",    nom:"Saisir fiche de suivi",   lien:"/saisir-fiche-suivi", items:[]};
  saisirFicheNotation =      {icon:"fas fa-pencil-alt",    nom:"Saisir fiche de notation",   lien:"/saisir-fiche-notation", items:[]};
  saisirFicheAppreciation =  {icon:"fas fa-pencil-alt",    nom:"Saisir fiche appréciation",   lien:"/saisir-fiche-appreciation", items:[]};

  suiviEmbauche =           {icon:"fas fa-chart-bar",     nom:"Suivi d'embauche",         lien:"/suivi-embauche", items:[]};
  classementEntreprise =    {icon:"fas fa-clipboard-list", nom:"Classement entreprises",  lien:"/classement-entreprise", items:[]};
  tendance =                {icon:"fas fa-chart-pie",     nom:"Tendances-Calcul d'occurences", lien:"/tendance-truc", items:[]};
  etiquetage =              {icon:"fas fa-server",        nom:"Etiquetage",               lien:"/etiquetage", items:[]};

  archivesRapports =        {icon:"fas fa-file-archive",  nom:"Rapports téléchargeables",  lien:"/rapports-de-stages", items:[]};
  archivesStages =          {icon:"fas fa-book",          nom:"Stages années précédentes", lien:"/archive-stages", items:[]};

  faq =                     {icon:"fas fa-question",      nom:"FAQ",                  lien:"/faq", items:[]};
  nousContacter =           {icon:"fas fa-comment",       nom:"Nous contacter",       lien:"/nous-contacter", items:[]};

  documentation =           {icon:"fas fa-book",          nom:"Documentation",        lien:"/documentation", items:[]};
  gitlab =                  {icon:"fab fa-gitlab",        nom:"Lien du GitLab",       lien:"https://gitlab.etu.umontpellier.fr/antoinebarbier/m1-ter-stageinfo/", items:[]};
  contacterSupport =        {icon:"fas fa-comment",       nom:"Contacter le support", lien:"/support", items:[]};

  exporterCSV = {icon:"fas fa-file-csv", nom:"Exporter CSV", lien:"/", items:[
    {icon:"", nom:"Les stages", lien:"/export-stage"},
    //{icon:"", nom:"Les soutenances", lien:"/soutenances-csv"},
    {icon:"", nom:"Les notes de stage", lien:"/export-note"}]};

  telechargerPDF = {icon:"fas fa-download", nom:"Télécharger", items:[
    {icon:"fas fa-border-all", nom:"Feuille de stage", lien:"/fiche-stage"},
    {icon:"", nom:"Fiche entreprise", lien:"http://localhost:3000/docs/Fiche_appreciation_stage.doc"},
    {icon:"", nom:"Fiche de notation", lien:"http://localhost:3000/docs/Fiche_notation.doc"}]};

    externalLink(link: String ){
      if(link.charAt(0)=="/"){
        return false;
      }else{
        return true;
      }

    }

  // -----------------------------------------------------------------------------------------------
  // - Ci dessous sont déclaré les différents menu de navigation pour chaque role de la plateforme - 
  // -----------------------------------------------------------------------------------------------

  // --- Menu de navigation pour le role Invité ---
  navigationInvite = [
    {
      title:"Stage",
      items: [ 
        this.listeStages, 
        this.voirLesEntreprise
        //this.planningSoutenance
      ]
    },
    {
      title:"Besoin d'aide ?",
      items: [ 
        //this.faq, 
        this.nousContacter]
    }
  ];

  // --- Menu de navigation pour le role Etudiant ---
  navigationEtudiant = [
    {
      title:"Stage",
      items: [ 
        this.mesStages, 
        this.listeStages, 
        this.voirLesEntreprise,
        //this.planningSoutenance, 
        this.saisirStage]
    },
    {
      title:"Besoin d'aide ?",
      items: [ 
        //this.faq, 
        this.nousContacter]
    }
  ];

  // --- Menu de navigation pour le role Tuteur ---
  navigationTuteur = [
    {
      title:"Stage",
      items: [ 
        this.mesStages, 
        this.listeStages, 
        this.voirLesEntreprise,
        //this.planningSoutenance, 
        this.saisirFicheSuivi, 
        this.saisirFicheNotation,]
    },/*
    {
      title:"Statistique",
      items: [ this.suiviEmbauche, this.classementEntreprise]
    },
    {
      title:"Archivage",
      items: [ this.archivesRapports, this.archivesStages]
    },*/
    {
      title:"Besoin d'aide ?",
      items: [ 
        //this.faq, 
        this.nousContacter]
    }
  ];

  // --- Menu de navigation pour le role Représentant entreprise ---
  navigationRepresentantEntreprise = [
    {
      title:"Stage",
      items: [ this.mesStages, 
        this.listeStages, 
        //this.planningSoutenance, 
        this.saisirStage, 
        this.saisirFicheSuivi, 
        this.saisirFicheAppreciation,]
    },
    {
      title:"Besoin d'aide ?",
      items: [ 
        //this.faq, 
        this.nousContacter]
    }
  ];

  // --- Menu de navigation pour le role Responsable Parcours ---
  navigationResponsableParcours = [
    {
      title:"Stage",
      items: [ 
        this.listeStages, 
        this.voirLesEntreprise,
        this.saisirStage, 
        this.saisirFicheSuivi, 
        this.saisirFicheNotation, 
        //this.planningSoutenance
      ]
    },/*
    {
      title:"Documents",
      items: []
    },
    {
      title:"Statistique",
      items: [ this.suiviEmbauche, this.classementEntreprise]
    },
    {
      title:"Archivage",
      items: [ this.archivesRapports, this.archivesStages]
    },*/
    {
      title:"Besoin d'aide ?",
      items: [ 
        //this.faq, 
        this.nousContacter]
    }
  ];

  // --- Menu de navigation pour le role Responsable stage  ---

  // ...

  // --- Menu de navigation pour le role Secretaire ---
  navigationSecretaire = [
    {
      title:"Administration",
      items: [  this.listeStages,
                this.listeUtilisateurs,
                this.listeEtudiants,
                this.listeEntreprise,
                //this.listeSoutenances,
                this.listeParcours]
    },
    {
      title:"Stage",
      items: [ 
        this.saisirStage, 
        this.saisirFicheSuivi, 
        this.saisirFicheNotation, 
        this.saisirFicheAppreciation, 
        //this.planningSoutenance
      ]
    },
    {
      title:"Documents",
      items: [ this.exporterCSV, this.telechargerPDF,]
    },/*
    {
      title:"Statistique",
      items: [ this.suiviEmbauche, this.classementEntreprise]
    },
    
    {
      title:"Archivage",
      items: [ this.archivesRapports, this.archivesStages]
    },*/
    {
      title:"Aide développeur",
      items: [ 
        //this.documentation, 
        this.gitlab]
    },
    {
      title:"Besoin d'aide ?",
      items: [ 
        //this.faq, 
        this.nousContacter]
    }
  ];

  // --- Menu de navigation pour le role Administrateur ---


  // ...

  public isAuth: boolean | undefined;

  private isAuthSub: Subscription | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthSub = this.authService.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  choixNavigation() : any{

    // La première condition permet de savoir si l'on affiche tous les liens que peut voir un administrateur
    if(this.authService.getViewAllRoute()){
      // alors on peut voir la vue secretaire (par contre on aura des problème d'autorisation si on a pas les droits)
      return this.navigationSecretaire;
    }else{

      // On choisi la vue de la barre de navigation en fonction du role autorisé à voir
      switch (this.authService.getViewRole()){
        case RoleUser.ADMIN:
        case RoleUser.SECRETAIRE:
          return this.navigationSecretaire;
        case RoleUser.ETUDIANT:
          return this.navigationEtudiant;
        case RoleUser.TUTEUR:
          return this.navigationTuteur;
        case RoleUser.RESPONSABLE_PARCOURS:
          return this.navigationResponsableParcours;
        case RoleUser.REPRESENTANT_ENTREPRISE:
          return this.navigationRepresentantEntreprise;
        case RoleUser.INVITE:
            return this.navigationInvite;
        default:
          return this.navigationInvite;
      }
    }

  }





}
