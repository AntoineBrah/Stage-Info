import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExempleDocComponent } from './pages/documentation/exemple-doc/exemple-doc.component';
import { Error404Component } from './pages/erreurs/error404/error404.component';
import {Error500Component} from "./pages/erreurs/error500/error500.component";
import {ExportStageComponent} from "./pages/export/export-stage/export-stage.component";

// import user
import { ProfileUserComponent } from './pages/user/profile-user/profile-user.component';
import { InfoUserComponent } from './pages/user/info-user/info-user.component';
import { ImportUsersComponent } from './pages/user/import-users/import-users.component';
import { ListUsersComponent } from './pages/user/list-users/list-users.component';
import { ListEtudiantsComponent } from './pages/user/list-etudiants/list-etudiants.component';

// import stages
import { ListStagesComponent } from './pages/stage/list-stages/list-stages.component';
import { InfoStageComponent } from './pages/stage/info-stage/info-stage.component';
import { AddStageComponent } from './pages/stage/add-stage/add-stage.component';
import { FicheSuiviComponent } from './pages/stage/fiche-suivi/fiche-suivi.component';
import { FicheNotationComponent } from './pages/stage/fiche-notation/fiche-notation.component';
import { FicheAppreciationComponent } from './pages/stage/fiche-appreciation/fiche-appreciation.component';

// import entreprise
import { ListEntreprisesComponent } from './pages/entreprise/list-entreprises/list-entreprises.component';
import { InfoEntrepriseComponent } from './pages/entreprise/info-entreprise/info-entreprise.component';

// import soutenance
import { ListSoutenancesComponent } from './pages/soutenance/list-soutenances/list-soutenances.component';
import { AddSoutenanceComponent } from './pages/soutenance/add-soutenance/add-soutenance.component';

// import parcours
import { ListParcoursComponent } from './pages/parcours/list-parcours/list-parcours.component';
import { InfoParcoursComponent } from './pages/parcours/info-parcours/info-parcours.component';

// import config
import { ConfigCalendrierSoutenancesComponent } from './pages/soutenance/config-calendrier-soutenances/config-calendrier-soutenances.component';

//import login
import { LoginComponent } from './pages/login/login.component';
import {ExportComponent} from "./pages/export/export-note/export.component";
import {ForgotPasswordComponent} from "./pages/login/forgot-password/forgot-password.component";


// Importation des guards
import { AuthGuardService } from "./core/guards/auth.guard";
import { AuthGuard } from "./core/guards/login.guard";
import { RoleGuard } from "./core/guards/role.guard";

// Importation des resolver
import { AllUsersResolver } from "./core/resolvers/all-users.resolver";
import { UserResolver } from "./core/resolvers/user.resolver";
import { AllStagesResolver } from "./core/resolvers/all-stages.resolver";
import { StageResolver } from "./core/resolvers/stage.resolver";
import { AllEntreprisesResolver } from './core/resolvers/all-entreprises.resolver';
import { EntrepriseResolver } from './core/resolvers/entreprise.resolver';
import { AllParcoursResolver } from './core/resolvers/all-parcours.resolver';
import { ParcoursResolver } from './core/resolvers/parcours.resolver';
import { AllSoutenancesResolver } from './core/resolvers/all-soutenances.resolver';
import { Error401Component } from './pages/erreurs/error401/error401.component';
import { AllRespParcoursResolver } from './core/resolvers/all-resp-parcours.resolver';
import { AllEtudiantsResolver } from './core/resolvers/all-etudiants.resolver';
import { AllStageOfUserResolver } from './core/resolvers/all-stage-of-user.resolver';
import { ContactComponent } from './pages/contact/contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: 'liste-stages', pathMatch: 'full', canActivate: [AuthGuardService, RoleGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path:'forgotpassword',component:ForgotPasswordComponent,canActivate: [AuthGuard]},
  { path: 'documentation', component: ExempleDocComponent, canActivate: [AuthGuardService, RoleGuard]},

  // routes stages
  { path: 'liste-stages',
      component: ListStagesComponent,
      canActivate: [AuthGuardService, RoleGuard],
      resolve: {
        allStages: AllStagesResolver,  // on associe un resolver à la route
        allParcours: AllParcoursResolver,
        allEntreprises: AllEntreprisesResolver
      }
  },
  { path: 'liste-stages/:id',
      component: InfoStageComponent,
      canActivate: [AuthGuardService, RoleGuard],
      resolve: {
        stage: StageResolver,  // on associe un resolver à la route
        allUsers: AllUsersResolver
      }
  },

  { path: 'saisir-stage',                          // route
    component: AddStageComponent,                  // component affiché
    canActivate: [AuthGuardService, RoleGuard]},   // guards utilisés


  { path: 'saisir-fiche-suivi', component: FicheSuiviComponent, canActivate: [AuthGuardService, RoleGuard], resolve: {allParcours: AllParcoursResolver, allUsers: AllUsersResolver}},
  { path: 'saisir-fiche-notation', component: FicheNotationComponent, canActivate: [AuthGuardService, RoleGuard], resolve: {allUsers: AllUsersResolver}},
  { path: 'saisir-fiche-appreciation', component: FicheAppreciationComponent, canActivate: [AuthGuardService, RoleGuard], resolve: {allUsers: AllUsersResolver}},

  // route users
  { path: 'liste-utilisateurs', component: ListUsersComponent, canActivate: [AuthGuardService, RoleGuard], resolve: { users: AllUsersResolver, allParcours: AllParcoursResolver, allEntreprises: AllEntreprisesResolver }},
  { path: 'liste-etudiants', component: ListEtudiantsComponent, canActivate: [AuthGuardService, RoleGuard], resolve: { AllEtudiants: AllEtudiantsResolver, allParcours: AllParcoursResolver }},
  { path: 'liste-utilisateurs/import-users', component: ImportUsersComponent, canActivate: [AuthGuardService, RoleGuard],resolve: {allParcours: AllParcoursResolver,users: AllUsersResolver}},
  { path: 'liste-utilisateurs/user/:id',
      component: InfoUserComponent,
      canActivate: [AuthGuardService, RoleGuard],
      resolve: {
        user: UserResolver,  // on associe un resolver à la route
        stages: AllStageOfUserResolver
      },
  },
  { path: 'profile', component: ProfileUserComponent, canActivate: [AuthGuardService, RoleGuard]},

  //routes entreprise
  { path: 'liste-entreprises', component: ListEntreprisesComponent, canActivate: [AuthGuardService, RoleGuard], resolve: { entreprises: AllEntreprisesResolver, allUsers: AllUsersResolver, }},
  { path: 'liste-entreprises/:id', component: InfoEntrepriseComponent, canActivate: [AuthGuardService, RoleGuard], resolve: { entreprise: EntrepriseResolver, allUsers: AllUsersResolver, stages: AllStageOfUserResolver }},

  // route soutenance
  { path: 'liste-soutenances', component: ListSoutenancesComponent, canActivate: [AuthGuardService, RoleGuard], resolve: { soutenances: AllSoutenancesResolver }},
  { path: 'liste-soutenances/add-soutenance', component: AddSoutenanceComponent, canActivate: [AuthGuardService, RoleGuard]},
  { path: 'liste-soutenances/edit-soutenance', component: AddSoutenanceComponent, canActivate: [AuthGuardService, RoleGuard]},
  { path: 'liste-soutenances/soutenance', component: AddSoutenanceComponent, canActivate: [AuthGuardService, RoleGuard]},

  // route parcours
  { path: 'liste-parcours', component: ListParcoursComponent, canActivate: [AuthGuardService, RoleGuard], resolve: { allParcours: AllParcoursResolver , allResponsables: AllRespParcoursResolver }},
  { path: 'liste-parcours/:id', component: InfoParcoursComponent, canActivate: [AuthGuardService, RoleGuard], resolve: { parcours: ParcoursResolver }},

  // config calendrier soutenance
  { path: 'configuration-calendrier-soutenances', component: ConfigCalendrierSoutenancesComponent, canActivate: [AuthGuardService, RoleGuard]},
  {path: 'export-note',component:ExportComponent,canActivate: [AuthGuardService],resolve: {stages: AllStagesResolver } },
  {path: 'export-stage',component:ExportStageComponent,canActivate: [AuthGuardService],resolve: {stages: AllStagesResolver } },
  
  { path: 'nous-contacter', component: ContactComponent, canActivate: [AuthGuardService]},
  { path: 'error401', component: Error401Component, canActivate: [AuthGuardService]},
  { path: 'not-found', component: Error404Component, canActivate: [AuthGuardService]},
  { path: 'error500', component: Error500Component},
  { path: '**', redirectTo: 'not-found', canActivate: []}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
