import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-fiche-suivi',
  templateUrl: './fiche-suivi.component.html',
  styleUrls: ['./fiche-suivi.component.scss']
})
export class FicheSuiviComponent implements OnInit {

  public readonly title: string = "Fiche de suivi du stage";

  constructor() { }

  ngOnInit(): void {
  }

}
