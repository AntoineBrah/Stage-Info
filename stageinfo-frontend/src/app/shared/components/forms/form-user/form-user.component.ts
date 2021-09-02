import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { UserService } from 'src/app/core/services/user.service';

import { studentNumberIsCorrectValidator } from 'src/app/core/validators/validators';
import { UserModel } from 'src/app/core/models/UserModel';
import { NameRoleUser, RoleUser } from 'src/app/core/enums/RoleUser';


@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  @Input() title: string = "";

  @Input() addUser: boolean = false;
  @Input() editUser: boolean = false;
  @Input() selectedUser: UserModel = new UserModel();
  @Input() viewUser: boolean = false;

  @Input() idUser: any = '';

  @Output() userEvent = new EventEmitter<UserModel>();

  Message: string = "";

  user: UserModel = new UserModel();
  allParcours: any;
  allEntreprises: any;

  public allRoles = [
    RoleUser.INVITE,
    RoleUser.ETUDIANT,
    RoleUser.TUTEUR,
    RoleUser.REPRESENTANT_ENTREPRISE,
    RoleUser.RESPONSABLE_PARCOURS,
    RoleUser.RESPONSABLE_STAGES,
    RoleUser.SECRETAIRE,
    RoleUser.ADMIN,
  ];

  

  // Boolean pour l'affichage des sections
  displaySectionEtudiant = false;
  displaySectionCoordonnees = false;
  displaySectionEntreprise = false;


  // @ts-ignore
  userForm: FormGroup;
  // @ts-ignore
  errorMessage: String;

  isError:boolean = false;

  promotions = ["2016/2017", "2017/2018","2018/2019", "2019/2020", "2020/2021"];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private formBuilder: FormBuilder,
              private route:ActivatedRoute,
              private userService: UserService) { 
    this.selectedUser = new UserModel();
    this.allParcours = this.route.snapshot.data.allParcours;
    this.allEntreprises = this.route.snapshot.data.allEntreprises;
  }

  ngOnInit(): void {
    this.initForm();
    this.setUserRoleValidators();

    if(!this.addUser){
      this.idUser = this.selectedUser._id;
      this.setInputForm(this.selectedUser._id);
    }
    this.displaySection(this.selectedUser.role);
    this.onRoleValueChanges();
  }

  // detecte les changements de valeur pour le role
  onRoleValueChanges(): void {
    console.log("changement de role utilisateur");
    this.userForm.get('role')?.valueChanges.subscribe((newRole: any)=>{
      this.displaySection(newRole);
    });
  }

  // lorsque le user selectionner à changer :
  ngOnChanges(){
    this.initForm();
    if(!this.addUser){  // Si on est sur le formulaire edit parcours alors on remplie les champs
      this.idUser = this.selectedUser._id;
      this.setInputForm(this.selectedUser._id);
    } 
    this.displaySection(this.selectedUser.role);
    this.onRoleValueChanges();
  }

  nameRole(role:RoleUser):any{
    switch (role) {
      case RoleUser.INVITE:     return NameRoleUser.INVITE;
      case RoleUser.ETUDIANT:   return NameRoleUser.ETUDIANT;
      case RoleUser.TUTEUR:     return NameRoleUser.TUTEUR;
      case RoleUser.SECRETAIRE: return NameRoleUser.SECRETAIRE;
      case RoleUser.ADMIN:      return NameRoleUser.ADMIN;
      case RoleUser.REPRESENTANT_ENTREPRISE:  return NameRoleUser.REPRESENTANT_ENTREPRISE;
      case RoleUser.RESPONSABLE_PARCOURS:     return NameRoleUser.RESPONSABLE_PARCOURS;
      case RoleUser.RESPONSABLE_STAGES:  return NameRoleUser.RESPONSABLE_STAGES;

      default: return NameRoleUser.UNDEFINED;
    }
  }
  
  initForm(){
    this.userForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      fax: [''],
      password: ['', Validators.required],
      role: ['', Validators.required],

      // Étudiant
      numeroEtudiant: [''],
      promotion: [''],
      parcours: [null],

      // Entreprise
      fonction: [''],
      entreprise: [null]
    });
  }

  // Les validateurs diffèrent selon le rôle
  setUserRoleValidators(){
    const numeroEtudiant = this.userForm.get('numeroEtudiant');
    const promotion = this.userForm.get('promotion');
    const parcours = this.userForm.get('parcours');
    const fonction = this.userForm.get('fonction');
    const entreprise = this.userForm.get('entreprise');

    this.userForm.get('role')?.valueChanges.subscribe(userRole => {
      if(userRole === RoleUser.ETUDIANT){
        numeroEtudiant?.setValidators([Validators.required, studentNumberIsCorrectValidator]);
        promotion?.setValidators([Validators.required]);
        parcours?.setValidators([Validators.required]);

        fonction?.setValidators(null);
        entreprise?.setValidators(null);
        fonction?.reset();
        entreprise?.reset();
      }
      else if(userRole === RoleUser.REPRESENTANT_ENTREPRISE){
        fonction?.setValidators([Validators.required]);
        entreprise?.setValidators([Validators.required]);

        numeroEtudiant?.setValidators(null);
        promotion?.setValidators(null);
        parcours?.setValidators(null);
        numeroEtudiant?.reset();
        promotion?.reset();
        parcours?.reset();
      }

      numeroEtudiant?.updateValueAndValidity();
      promotion?.updateValueAndValidity();
      parcours?.updateValueAndValidity();
      fonction?.updateValueAndValidity();
      entreprise?.updateValueAndValidity();
    });
  }

  setInputForm(id:any){
  // On set les données du user dans le formulaire
  this.userForm.patchValue({
    nom: this.selectedUser.nom,
    prenom: this.selectedUser.prenom,
    email: this.selectedUser.email,
    telephone: this.selectedUser.telephone,
    fax: this.selectedUser.fax,
    password: this.selectedUser.password,
    role: this.selectedUser.role,

    // Étudiant
    numeroEtudiant: this.selectedUser.numeroEtudiant,
    promotion: this.selectedUser.promotion,
    parcours: this.selectedUser.parcours?._id,

    // Entreprise
    fonction: this.selectedUser.fonction,
    entreprise: this.selectedUser.entreprise?._id
  });
  }

  


  onSubmitForm(){
    const formValue = this.userForm.value;
    if(!this.validator(formValue['role'])){
      this.isError = true;
    }else{
      this.isError = false;

      
      const newUser = new UserModel(
        this.idUser,
        formValue['nom'],
        formValue['prenom'],
        formValue['email'],
        formValue['telephone'],
        formValue['fax'],
        formValue['password'],
        formValue['role'],

        // Étudiant
        formValue['numeroEtudiant'],
        formValue['promotion'],
        formValue['parcours'],

        // Entreprise
        formValue['fonction'],
        formValue['entreprise']
      );
      console.log(newUser);
  
      if(this.addUser){
        this.ajouterUser(newUser);
      }
      else{
        this.modifierUser(this.idUser, newUser);
      }

    }
  }

  ajouterUser(user:any){
    this.userService.addUser(user)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any) => {
        console.log("User : "+ user.nom + " "+ user.prenom + " ajouté à la plateforme !");
        this.userForm.reset();  // on reset les données dans le forumulaire
        user._id = _res.idUser;
        console.log({message:"emit du user au component parent", object: user})
        this.userEvent.emit(user); // on envoie le parcours dans le component parent
        this.userForm.reset(); 
    });
  }

  modifierUser(id:any, user:any){
    this.userService.updateUser(id, user)
    .pipe(takeUntil(this.destroy$))
      .subscribe((_res: any[]) => {
        console.log("User : "+ user.nom + " "+ user.prenom + " modifié !");
        this.userForm.reset(); // on reset les données dans le forumulaire
        this.userEvent.emit(user); // on envoie le parcours dans le component parent
        this.userForm.reset(); 
      });
  }

  get userFormControl() {
    return this.userForm.controls;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  displayValidationSelectStyle(input:any): any{
    if(this.isError && input.invalid){
      return  'custom-select is-invalid';
    }else if(this.isError){
      return 'custom-select is-valid';
    }else{
      return 'custom-select ';
    }
  }

  displayValidationInputStyle(input:any): any{
    if(this.isError && input.invalid){
      return  'form-control is-invalid';
    }else if(this.isError){
      return 'form-control is-valid';
    }else{
      return 'form-control';
    }
  }

  displaySection(role : string){
    switch (role) {
      case RoleUser.REPRESENTANT_ENTREPRISE:
          this.displaySectionEtudiant = false;
          this.displaySectionCoordonnees = true;
          this.displaySectionEntreprise = true;
          break;
      case RoleUser.ETUDIANT:
          this.displaySectionEtudiant = true;
          this.displaySectionCoordonnees = true;
          this.displaySectionEntreprise = false;
          break;
      case RoleUser.TUTEUR:
      case RoleUser.RESPONSABLE_PARCOURS:
      case RoleUser.RESPONSABLE_STAGES:
      case RoleUser.SECRETAIRE:
      case RoleUser.ADMIN:
          this.displaySectionEtudiant = false;
          this.displaySectionCoordonnees = true;
          this.displaySectionEntreprise = false;
          break;
      case RoleUser.INVITE:
      default:
        this.displaySectionEtudiant = false;
        this.displaySectionCoordonnees = false;
        this.displaySectionEntreprise = false;
        break;
    }
  }

  // Fonction qui permet de retourner true ou false pour pouvoir dire si on peut passé à la suite (bouton next)
  validator(role : string) : boolean{

    // les éléments obligatoire qu'importe le role
    var generalValidation = [
      this.userFormControl.nom.invalid , 
      this.userFormControl.prenom.invalid,
      this.userFormControl.email.invalid,
      this.userFormControl.password.invalid,
      this.userFormControl.role.invalid,
      ];

    // validation spécifique à un étudiant
    var etudiantValidation = [
      this.userFormControl.numeroEtudiant.invalid,
      this.userFormControl.promotion.invalid,
      this.userFormControl.parcours.invalid
      ];

      // validation spécifique à un représentant entreprise
    var entrepriseValidation = [
      this.userFormControl.fonction.invalid, 
      this.userFormControl.entreprise.invalid,
      ];

    switch (role) {
      case RoleUser.REPRESENTANT_ENTREPRISE:
          console.log("all validation is : " + generalValidation.every( e  => e == false) && entrepriseValidation.every( e  => e == false))
          return generalValidation.every( e  => e == false) && 
                  entrepriseValidation.every( e  => e == false);
      case RoleUser.ETUDIANT:
        return generalValidation.every( e  => e == false) && 
        etudiantValidation.every( e  => e == false);
      case RoleUser.TUTEUR:
      case RoleUser.RESPONSABLE_PARCOURS:
      case RoleUser.RESPONSABLE_STAGES:
      case RoleUser.SECRETAIRE:
      case RoleUser.ADMIN:
      case RoleUser.INVITE:
      default:
        console.log("all validation is : " + generalValidation.every( e  => e == false))
        return generalValidation.every( e  => e == false)
    }
  }
}
