import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EntrepriseModel } from 'src/app/core/models/EntrepriseModel';

import { EntrepriseService } from 'src/app/core/services/entreprise.service';

import { CommonListingTable } from 'src/app/shared/classes/common-listing-table';

@Component({
  selector: 'app-list-entreprises',
  templateUrl: './list-entreprises.component.html',
  styleUrls: ['./list-entreprises.component.scss']
})
export class ListEntreprisesComponent extends CommonListingTable implements OnInit, OnDestroy {
  
  public readonly title: string = "Liste des entreprises";

  // pour pouvoir détruire les subscribes
  destroy$: Subject<boolean> = new Subject<boolean>();

  selectItem:any; // item qui est selectionné 

  constructor(private route: ActivatedRoute, private entrepriseService: EntrepriseService) { 
    super();
    this.visibleProperties = [ 
      { name: 'nom', sorted: false },
      { name: 'ville', sorted: false },
      { name: 'representant.nom', sorted: false }
    ];
    this.selectItem = new EntrepriseModel();
  }

  ngOnInit(): void {
    this.allItems = this.route.snapshot.data.entreprises;  
  }

  /**
   * @fonction selectedItem
   * @description Met à jour le parcours selectionné, permet au modal de savoir quelle contenu afficher
   * @params item : ParcoursModel -> contient les informations du parcours selectionné
   */
  selectedItem(item:any){
    this.selectItem = item;
  }

  /**
   * @fonction updateTable
   * @description Met à jour le tableau local des entreprises (afin d'eviter de recharger la page pour avoir la donnée modifier)
   * @params parcours : any -> contient toutes les données de l'entreprise qui a été modifié
   */
  updateTable(item:any){
    // on cherche l'index de l'entreprise modifié
    var index = this.allItems.findIndex(((obj: { _id: any; }) => obj._id == item._id));
      console.log("index update : "+ index);
      this.allItems[index] = item;  // On met a jour le tableau local avec les nouvelles datas

  }

  addEntreprise(item:any){
    console.log(item);
    // ajout d'une nouvelle entreprise dans le tableau local
    this.allItems.push(item);
  }

  /**
   * @fonction deleteParcours
   * @description Supprime le parcours selectionné sur la base de donnée et met à jour le tableau local
   * @params id : any -> identifiant du parcours à supprimer
   */
  deleteEntreprise(id:any){
    console.log({message:"delete", id: id});
    this.entrepriseService.deleteEntrepriseById(id)
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
