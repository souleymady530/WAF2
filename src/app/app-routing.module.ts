import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import { ListeRemboursementsComponent } from './components/liste-remboursements/liste-remboursements.component';
import { ListeCreditsComponent } from './components/liste-credits/liste-credits.component';
import { AppComponent } from './app.component';
import { ProfileService } from './services/profile/profile.service';
import { ListeApplicantsComponent } from './components/liste-applicants/liste-applicants.component';
import { AccueilComponent } from './composants/manager/accueil/accueil.component';
import { ListeEndorserComponent } from './components/liste-endorser/liste-endorser.component';
import { AgentHomeComponent } from './pages/agent-home/agent-home.component';
import { AccueilAgentComponent } from './composants/agent/accueil-agent/accueil-agent.component';
import { LoansPerRemboursementComponent } from './components/statistiques/loans-per-remboursement/loans-per-remboursement.component';
import { AddAgentComponent } from './composants/agent/add-agent/add-agent.component';
import { EditAgentComponent } from './composants/agent/edit-agent/edit-agent.component';
import { AddManagerComponent } from './composants/manager/add-manager/add-manager.component';
import { EditManagerComponent } from './composants/manager/edit-manager/edit-manager.component';
import { ManagerListerComponent } from './composants/manager/manager-lister/manager-lister.component';
import { AgentListComponent } from './composants/agent/agent-list/agent-list.component';
import { ManageSettingsComponent } from './composants/manager/manage-settings/manage-settings.component';
import { ListeCreditComponent } from './composants/Credits/liste-credit/liste-credit.component';
import { AddCreditComponent } from './composants/Credits/add-credit/add-credit.component';
import { AddCredi2Component } from './composants/Credits/add-credi2/add-credi2.component';
import { ViewLoanDetailsComponent } from './composants/Credits/view-loan-details/view-loan-details.component';
import { ViewApplicantAntecedantComponent } from './composants/Credits/view-applicant-antecedant/view-applicant-antecedant.component';
import { ViewRetardsComponent } from './composants/Credits/view-retards/view-retards.component';
import { ListeCredit2Component } from './composants/Credits/liste-credit2/liste-credit2.component';
import { AgentSettingsComponent } from './composants/agent/agent-settings/agent-settings.component';
import { PrintEtatComponent } from './composants/General/print-etat/print-etat.component';
import { EditCreditCreditComponent } from './composants/General/edit-credit-credit/edit-credit-credit.component';


const routes: Routes = [
  
  {
    path: '',
    component: LoginComponent,
    canActivate: [ProfileService]
  },

 
  
  {
    path: 'not-found',
    title:"page not found",
    component: NotFoundComponent
  },
  {
    path: 'login',
    title:"Authentification",
    component: LoginComponent
  },
  {
    path: 'Print/:id',
    title:"Generer un etat",
    component: PrintEtatComponent
  },
 
   


{
  title:"Tableau de bord",
    path: 'agent-home',
    component: AgentHomeComponent,
  canActivate: [ProfileService],
              children:[
                {
                  path:'accueil-agent',
                canActivate: [ProfileService],
                  component:AccueilAgentComponent,
                  title:"Accueil"
                },

                {
                  path:'remboursements',
                canActivate: [ProfileService],
                  component:ListeRemboursementsComponent,
                  title:"Les Remboursements"
                },

                {
                  path:'addcredits',
                canActivate: [ProfileService],
                  component:AddCreditComponent,
                  title:"Faire une demande de credit"
                },
                {
                  path:'oldaddcredits',
                canActivate: [ProfileService],
                  component:AddCredi2Component,
                  title:"Faire une demande de credit"
                },
                {
                  path:'viewcredits/:id',
                canActivate: [ProfileService],
                  component:ViewLoanDetailsComponent,
                  title:"Details du credit"
                },

                {
                  path:'credits_classique',
                canActivate: [ProfileService],
                  component:ListeCreditComponent,
                  title:"Les Credits"
                },

                {
                  path:'credits_formule2',
                canActivate: [ProfileService],
                  component:ListeCredit2Component,
                  title:"Les Credits"
                },
                {
                  path:'retards',
                canActivate: [ProfileService],
                  component:ViewRetardsComponent,
                  title:"Suivit des retards"
                },


                {
                  path:'applicantdetails/:id',
                canActivate: [ProfileService],
                  component:ViewApplicantAntecedantComponent,
                  title:"Les antecedants"
                },
                {
                  path:'editcredits/:id',
                canActivate: [ProfileService],
                  component:EditCreditCreditComponent,
                  title:"Les Credits"
                },
                {
                  path:'settings/:id',
                canActivate: [ProfileService],
                  component:AgentSettingsComponent,
                  title:"Modififer mon profile"
                },
              ]
  },
  {
    title:"Tableau de bord",
    path: 'dashboard',
  canActivate: [ProfileService],
    component: HomeComponent,
              children:[
                {
                  path:'accueil',
                canActivate: [ProfileService],
                  component:AccueilComponent,
                  title:"Accueil"
                },

                {
                  path:'addmanager',
                canActivate: [ProfileService],
                  component:AddManagerComponent,
                  title:"Ajouter un manager"
                },

                {
                  path:'retards',
                canActivate: [ProfileService],
                  component:ViewRetardsComponent,
                  title:"Suivit des retards"
                },

                {
                  path:'editmanager/:id',
                canActivate: [ProfileService],
                  component:EditManagerComponent,
                  title:"Modifier les information d'un manageur"
                },

                {
                  path:'managers',
                canActivate: [ProfileService],
                  component:ManagerListerComponent,
                  title:"Les Managers"
                },
                {
                  path:'addcredits',
                canActivate: [ProfileService],
                  component:AddCreditComponent,
                  title:"Faire une demande de credit"
                },
                {
                  path:'viewcredits/:id',
                canActivate: [ProfileService],
                  component:ViewLoanDetailsComponent,
                  title:"Details du credit"
                },
                {
                  path:'oldaddcredits',
                canActivate: [ProfileService],
                  component:AddCredi2Component,
                  title:"Faire une demande de credit"
                },
                {
                  path:'agents',
                 canActivate: [ProfileService],
                  component:AgentListComponent,
                  title:"Les Agents"
                },
                {
                  path:'addagent',
                 canActivate: [ProfileService],
                  component:AddAgentComponent,
                  title:"Ajouter un agent"
                },
                {
                  path:'editagent/:id',
                 canActivate: [ProfileService],
                  component:EditAgentComponent,
                  title:"Modifier les informations de l agent"
                },

                {
                  path:'applicants',
                canActivate: [ProfileService],
                  component:ListeApplicantsComponent,
                  title:"Les Demandeurs"
                },

                {
                  path:'endorser',
                canActivate: [ProfileService],
                  component:ListeEndorserComponent,
                  title:"Les Avales"
                },



                {
                  path:'remboursements',
                canActivate: [ProfileService],
                  component:ListeRemboursementsComponent,
                  title:"Les Remboursements"
                },

                {
                  path:'credits_classique',
                canActivate: [ProfileService],
                  component:ListeCreditComponent,
                  title:"Les Credits"
                },
                {
                  path:'credits_formule2',
                canActivate: [ProfileService],
                  component:ListeCredit2Component,
                  title:"Les Credits"
                },

                {
                  path:'addcredits',
                canActivate: [ProfileService],
                  component:AddCreditComponent,
                  title:"Les Credits"
                },
                {
                  path:'editcredits/:id',
                canActivate: [ProfileService],
                  component:EditCreditCreditComponent,
                  title:"Les Credits"
                },
                {
                  path:'applicantdetails/:id',
                canActivate: [ProfileService],
                  component:ViewApplicantAntecedantComponent,
                  title:"Les antecedants"
                },
                
                {
                  path:'settings',
                canActivate: [ProfileService],
                  component:ManageSettingsComponent,
                  title:"Les Parametres"
                },

              ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
