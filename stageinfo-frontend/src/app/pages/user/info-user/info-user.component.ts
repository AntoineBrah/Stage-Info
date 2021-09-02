import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StageModel } from 'src/app/core/models/StageModel';

import { UserModel } from 'src/app/core/models/UserModel';
import { AuthService } from 'src/app/core/services/auth.service';
import { StageService } from 'src/app/core/services/stage.service';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {

  // Les deux lignes suivantes sont utilisé pour afficher la page profile de l'utilisateur connecté à la plateforme
  @Input() myProfile: boolean = false;

  user: UserModel;
  stages:any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private route:ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private stageService: StageService) { 

      this.user = new UserModel();
      this.stages = Array<StageModel>();
  }

  ngOnInit(): void {
    // si on est sur la page de profile alors on charge les données de l'utilisateur connecté
    if(this.myProfile){
      // On récupère les données de l'utilisateur connecté
      this.userService.getUserById(this.authService.getUserId())
          .pipe(takeUntil(this.destroy$))
          .subscribe((_res: UserModel) => {
            this.user = _res;
        });
        // on récupère les données des stages associé à l'utilisateur connecté
        this.stageService.getAllStageRelatedUser(this.authService.getUserId())
          .pipe(takeUntil(this.destroy$))
          .subscribe((_res: UserModel) => {
            this.stages = _res;
        });
    }else{
      this.user = this.route.snapshot.data.user;    
      this.stages = this.route.snapshot.data.stages; 
    }

    console.log(this.user)
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
