import { Component, OnDestroy,  OnInit } from '@angular/core';
import { CommonListingTable } from 'src/app/shared/classes/common-listing-table';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SoutenanceService } from 'src/app/core/services/soutenance.service';

@Component({
  selector: 'app-list-soutenances',
  templateUrl: './list-soutenances.component.html',
  styleUrls: ['./list-soutenances.component.scss']
})
export class ListSoutenancesComponent extends CommonListingTable implements OnInit, OnDestroy {

  public readonly title: string = "Liste des soutenances";

  destroy$: Subject<boolean> = new Subject<boolean>();

  selectItem:any; // item qui est selectionné 

  constructor(private route:ActivatedRoute, private soutenanceService: SoutenanceService) { 
    super();
    this.visibleProperties = [
      { name: 'etudiant', sorted: false },
      { name: 'entreprise', sorted: false },
      { name: 'tuteurUniv', sorted: false },
      { name: 'tuteurEntreprise', sorted: false }
    ];
  }

  ngOnInit(): void {
    this.allItems = this.route.snapshot.data.soutenances;  
    //this.commonProperties.pageCount = Math.ceil(this.allItems.length / this.commonProperties.nbrEntries);
    //this.commonProperties.sizeFilteredArray = this.allItems.length;
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
    // on cherche l'index de la soutenance modifié
    var index = this.allItems.findIndex(((obj: { _id: any; }) => obj._id == item._id));
    console.log("index update : "+ index);
    this.allItems[index] = item;  // On met a jour le tableau local avec les nouvelles datas
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
