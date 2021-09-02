import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  singinForm: FormGroup;
  // @ts-ignore
  errorMessage: String;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.singinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required]]
    });
  }
  onSubmit(){
    const email = this.singinForm.get('email')?.value;
    const password = this.singinForm.get('password')?.value;
    this.authService.login(email,password).then(

      ()=> {
        // @ts-ignore
        this.router.navigate(['/']);

      },
      (error) =>{

        this.errorMessage = error.error.error;
      }
    );
  }
}
