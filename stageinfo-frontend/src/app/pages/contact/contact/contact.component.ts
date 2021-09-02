import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleUser } from 'src/app/core/enums/RoleUser';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  // @ts-ignore
  emailForm: FormGroup;

  // @ts-ignore
  contactForm: FormGroup;
  // @ts-ignore
  errorMessage: String;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      message:['', Validators.required]
    });
   
    this.emailForm = this.formBuilder.group({
      email:['', Validators.required]
    });
  }

  envoyerMessage(){
    const formValue = this.contactForm.value;
    var data :any = {
      dateMessage: new Date(),
      message: formValue['message'],
    };
    /**
     * 
     * TO DO !
     */
  }

  
  updateContact(){
    const formValue = this.emailForm.value;
    var data :any = {
      email: formValue['email'],
    };
    
  }

  canEditEmail():boolean{
      switch (this.authService.getViewRole()) {
        case RoleUser.INVITE:
        case RoleUser.ETUDIANT:
        case RoleUser.REPRESENTANT_ENTREPRISE:

          return false;
        case RoleUser.ADMIN:
          return true;
        default:
          return false;
      }
    }
  
}
