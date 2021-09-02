import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-item-comment',
  templateUrl: './card-item-comment.component.html',
  styleUrls: ['./card-item-comment.component.scss']
})
export class CardItemCommentComponent implements OnInit {
  @Input() idUser: string ="";
  @Input() author: string ="";
  @Input() date: string ="";
  constructor() { }

  ngOnInit(): void {
  }

}
