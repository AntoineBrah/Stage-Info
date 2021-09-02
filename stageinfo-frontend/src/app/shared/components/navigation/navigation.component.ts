import { Component, Input, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/core/services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Input() title: string = "Titre";
  constructor(private navigation: NavigationService) { }

  ngOnInit(): void {
  }

  back(){
    this.navigation.back();
  }

}
