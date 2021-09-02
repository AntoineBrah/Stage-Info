import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fiche-notation',
  templateUrl: './fiche-notation.component.html',
  styleUrls: ['./fiche-notation.component.scss']
})
export class FicheNotationComponent implements OnInit {

  public readonly title: string = "Fiche de notation";

  constructor() { }

  ngOnInit(): void {
  }

}
