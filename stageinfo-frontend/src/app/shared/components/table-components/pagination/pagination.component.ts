import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class ListPaginationComponent implements OnInit {

  @Input() public commonProperties: any;

  constructor() { 
    this.commonProperties = {};
  }

  ngOnInit(): void {}

  numFirstItemOfPage():number{
    return (this.commonProperties.currentPage * this.commonProperties.nbrEntries) -  this.commonProperties.nbrEntries + 1;
  }

  numLastItemOfPage():number{
    return (this.commonProperties.pageCount) != this.commonProperties.currentPage ?  
      (this.commonProperties.currentPage * this.commonProperties.nbrEntries) : 
      (this.commonProperties.sizeFilteredArray);
  }

  onClickPageNumber(nbr: number) : void {
    this.commonProperties.lastPage = this.commonProperties.currentPage;
    this.commonProperties.currentPage = nbr;

    if (this.commonProperties.lastPage < this.commonProperties.currentPage) {
      let difference = this.commonProperties.currentPage - this.commonProperties.lastPage;
      this.commonProperties.startIndex += this.commonProperties.nbrEntries * difference;
    }
    else {
      let difference = this.commonProperties.lastPage - this.commonProperties.currentPage;
      this.commonProperties.startIndex -= this.commonProperties.nbrEntries * difference;
    }

    this.commonProperties.endIndex = this.commonProperties.startIndex + this.commonProperties.nbrEntries;
  }

  onClickNextPage() : void{
    if (this.commonProperties.currentPage + 1 <= this.commonProperties.pageCount) {
      this.commonProperties.lastPage = this.commonProperties.currentPage;
      this.commonProperties.currentPage++;
      this.commonProperties.startIndex += this.commonProperties.nbrEntries;
      this.commonProperties.endIndex = this.commonProperties.startIndex + this.commonProperties.nbrEntries;
    }
  }

  onClickPreviousPage() : void{
    if (this.commonProperties.currentPage - 1 > 0) {
      this.commonProperties.lastPage = this.commonProperties.currentPage;
      this.commonProperties.currentPage--;
      this.commonProperties.startIndex -= this.commonProperties.nbrEntries;
      this.commonProperties.endIndex = this.commonProperties.startIndex + this.commonProperties.nbrEntries;
    }
  }

}
