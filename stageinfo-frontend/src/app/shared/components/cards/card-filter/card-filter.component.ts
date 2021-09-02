import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-filter',
  templateUrl: './card-filter.component.html',
  styleUrls: ['./card-filter.component.scss']
})
export class ListFilterComponent implements OnInit{

  @Input() public commonProperties: any;

  constructor() {
    this.commonProperties = {};
  }

  ngOnInit(): void {}
}
