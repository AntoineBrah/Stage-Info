import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-stage',
  templateUrl: './add-stage.component.html',
  styleUrls: ['./add-stage.component.scss']
})
export class AddStageComponent implements OnInit {

  page: number = 1;
  nbMaxPage :number = 3;


  title = "Nouveau stage";
  stage = {
    titre :"",
    description :"",
    duree :"",
    dateDebut :"",
    niveauRequis :"",
    parcours :"",
    entreprise:"",
    salaire:"",
    avantages:"",
    conditions:"",
    competences:"",
  };

  entreprise = {
    nom:"",
    adresse :	"",
    codePostal:"",
    ville : "",
    siteInternet :	"",
    description :	"",
    tel :	"", 
    fax : "",
    siret :""	,
    secteurActivité :	"",
    nbSalarier:""	,
    chiffreAffaire:""	,
    local:"" ,
  };

  niveauRequis = ["Licence 3", "Master 1", "Master 2"];
  parcours = ["AIGLE", "MIT","DECOL", "IMAGINA"];

  constructor() { }

  ngOnInit(): void {
  }

  displayFielset(theme : string) : boolean{
    console.log(theme);
    switch (theme) {
      case "stage": //page 0
        return this.page === 1 ? true : false;
      case "entreprise": // page 1
        return this.page === 2 ? true : false;
      case "more": // page 1
        return this.page === 3 ? true : false;
      default:
        return false;
    }
  }

  isDone(theme : string) : boolean{
    console.log(theme);
    switch (theme) {
      case "stage": //page 0
        return this.page >= 1 ? true : false;
      case "entreprise": // page 1
        return this.page >= 2 ? true : false;
      case "more": // page 1
        return this.page >= 3 ? true : false;
      default:
        return false;
    }
  }

  next(){
    if(this.page < this.nbMaxPage){
      this.page++;
    }
  }
  pred(){
    if(this.page > 1){
      this.page--;
    }
  }

  lastPage() :boolean {
    if(this.page == this.nbMaxPage){
      return true;
    }else{
      return false;
    }
  }
  firstPage() :boolean {
    if(this.page <= 1){
      return true;
    }else{
      return false;
    }
  }

}
