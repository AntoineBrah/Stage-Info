import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ParcoursModel } from 'src/app/core/models/ParcoursModel';
import { ParcoursService } from 'src/app/core/services/parcours.service';

import { CommonListingTable } from 'src/app/shared/classes/common-listing-table';

@Component({
  selector: 'app-list-parcours',
  templateUrl: './list-parcours.component.html',
  styleUrls: ['./list-parcours.component.scss']
})
export class ListParcoursComponent extends CommonListingTable implements OnInit, OnDestroy {

  public readonly title: string = "Liste des parcours";

  // pour pouvoir détruire les subscribes
  destroy$: Subject<boolean> = new Subject<boolean>();

/* Je l'ai passé de 'parcoursModel' à 'any' pour le moment car j'ai une erreur sinon, je remodifierai */
  selectItem:any; // item qui est selectionné 

  constructor(private route:ActivatedRoute,
              private parcoursService: ParcoursService) { 
    super();
    this.visibleProperties = [
      { name: 'acronyme', sorted: false},
      { name: 'intitule', sorted: false },
      { name: 'niveau', sorted: false },
      { name: 'responsable.nom', sorted: false }

    ];
    this.selectItem = new ParcoursModel();
  }

  ngOnInit(): void {
    this.allItems = this.route.snapshot.data.allParcours;  // on récupère les parcours qui sont dans le resolver
    console.log(this.allItems);
  }

  /**
   * @fonction selectedItem
   * @description Met à jour le parcours selectionné, permet au modal de savoir quelle contenu afficher
   * @params item : ParcoursModel -> contient les informations du parcours selectionné
   */
  selectedItem(item:ParcoursModel){
    this.selectItem = item;
  }

  /**
   * @fonction updateTable
   * @description Met à jour le tableau local des parcours (afin d'eviter de recharger la page pour avoir la donnée modifier)
   * @params parcours : any -> contient toutes les données du parcours qui a été modifié
   */
  updateTable(item:any){
    // on cherche l'index du parcours modifié
    var index = this.allItems.findIndex(((obj: { _id: any; }) => obj._id == item._id));

      console.log("index update : "+ index);
      this.allItems[index] = item;  // On met a jour le tableau local avec les nouvelles datas


  }

  addParcours(parcours:any){
    // On ajoute le nouveau parcours dans le tableau local (afin de ne pas recharger la page pour voir l'ajout)
    console.log(parcours);
      // alors ajout d'un nouveau parcours dans le tableau local
    this.allItems.push(parcours);
    console.log({message:"reception du nouveau parcours", object: parcours});
  }

  /**
   * @fonction deleteParcours
   * @description Supprime le parcours selectionné sur la base de donnée et met à jour le tableau local
   * @params id : any -> identifiant du parcours à supprimer
   */
  deleteParcours(id:any){
    console.log({message:"delete", id: id});
    this.parcoursService.deleteParcoursById(id)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any[]) => {
        console.log(_res);
        // On supprime de l'affichage le parcours (on sait qu'il est supprimer de la base de donnée donc on peut le supprimer sans recharger les données distantes)
        this.allItems = this.allItems.filter((object: { _id: any; }) => { return object._id != id; });
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
