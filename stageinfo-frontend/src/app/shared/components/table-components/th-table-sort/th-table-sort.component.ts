import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-th-table-sort',
  templateUrl: './th-table-sort.component.html',
  styleUrls: ['./th-table-sort.component.scss']
})
export class ThTableSortComponent implements OnInit {
  @Input() sorted:any;
  constructor() { }

  ngOnInit(): void {
  }

}
