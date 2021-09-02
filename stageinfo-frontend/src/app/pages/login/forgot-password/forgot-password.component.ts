import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Papa} from "ngx-papaparse";
import {UserService} from "../../../core/services/user.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  // @ts-ignore
  importForm: FormGroup ;
  destroy$: Subject<boolean> = new Subject<boolean>();
  ngif: boolean = false;
  ngif1: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.importForm = this.formBuilder.group({
      Email: ['',Validators.required],
    });
  }

  envoyer() {

    this.userService.forgotPassword(this.importForm?.value['Email'])
      .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any[]) => {
          this.ngif=true;
          this.ngif1=false;
        },
        error => {this.ngif1=true

        });

  }
}
