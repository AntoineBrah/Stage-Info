import { Component,OnInit } from '@angular/core';
import {AuthService} from "./core/services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'stageinfo';
  sidebar = true;
  public isAuth: boolean | undefined;

  private isAuthSub: Subscription | undefined;

  constructor(private auth: AuthService) { }

  displaySidebar(value :boolean){
    this.sidebar = value;
  }

  fullpage():boolean{
    return false;
  }

  ngOnInit(): void {
    this.isAuthSub = this.auth.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }
}
