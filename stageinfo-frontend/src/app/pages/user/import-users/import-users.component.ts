import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Papa } from "ngx-papaparse";
import { takeUntil } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserModel } from 'src/app/core/models/UserModel';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'app-import-users',
  templateUrl: './import-users.component.html',
  styleUrls: ['./import-users.component.scss']
})
export class ImportUsersComponent implements OnInit {
  csv :any;
  uploaded = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  allParcours: any;
  allUser: any;
  // @ts-ignore
  importForm: FormGroup ;

  private isCSV_Valid: boolean | undefined;
  errorMessage: string= "";
  alert: boolean=false;
  u: number = 0;
  alert1:string ="";
  constructor(  private route: ActivatedRoute,
                private router: Router,
                private papa: Papa,
                private userService: UserService,
                private formBuilder: FormBuilder) {
    this.allParcours = this.route.snapshot.data.allParcours;
    this.allUser = this.route.snapshot.data.users;
  }

  ngOnInit(): void {

    this.initForm();
  }
  initForm(){
    this.importForm = this.formBuilder.group({
      ann: ['',Validators.required],
    });
  }
  envoyer() {
    let reader: FileReader = new FileReader();

    reader.readAsText(this.csv, "UTF-8");
    reader.onload = ev => {
      const text = reader.result;
      const results = this.papa.parse(text as string, {header: false});
      if (results !== null && results !== undefined && results.data !== null &&
        results.data !== undefined && results.data.length > 0 && results.errors.length === 0) {
        this.isCSV_Valid = true;
        let csvTableHeader = results.data[0];
        console.log(this.allUser)

        let csvTableData = [...results.data.slice(1, results.data.length)];
        console.log( csvTableData[4]);
        const ok = 'azertyupqsdfghjkmwxcvbn23456789AZERTYUPQSDFGHJKMWXCVBN@!#$*&+-';
        let pass = '';
         let longueur = 10;
        for(i=0;i<longueur;i++){
          let wpos = Math.round(Math.random()*ok.length);
          pass+=ok.substring(wpos,wpos+1);
        }

        var i:number;
        var _idparcours =null;
        for(i=2;i<csvTableData.length;i++) {
          for (var j =0;j<this.allParcours.length;j++){
            console.log(this.allParcours[j].acronyme.toLowerCase());
            if(csvTableData[i][5].toLowerCase().includes(this.allParcours[j].acronyme.toLowerCase())){
              _idparcours = this.allParcours[j]._id;
              break;
            }
          }
          console.log(_idparcours)
          const newUser = new UserModel(
            '',
            csvTableData[i][2],
            csvTableData[i][1],
            csvTableData[i][4],
            '',
            '',
            pass,
            'etudiant',
            csvTableData[i][0],
            this.importForm?.value['ann'],
            _idparcours,
            '',
            null,
          );
          this.ajouterUser(newUser);
        }
      }
    }
  }
  fileChoosen(event: any) {
    if(event.target.value){
      this.csv=<File>event.target.files[0];
      this.uploaded =true;
    }
  }
  ajouterUser(user:any){
    this.userService.addUser(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any[]) => {
        console.log("User : "+ user.nom + " "+ user.prenom + " ajouté à la plateforme !");
          this.u +=1;
          this.alert=true;
      },
        error => {

          var index = this.allUser.findIndex(((obj: { email: any; }) => obj.email == user.email));
          delete user.password;
          this.modifierUser(this.allUser[index]._id,user)
          this.errorMessage += user.email+"\n";
        });
  }
  modifierUser(id:any, user:any){
    this.userService.updateUser(id, user)
      .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any[]) => {
        this.alert1 += user.email+"\n";

      });
  }
}
