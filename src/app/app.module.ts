import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatStepperModule} from '@angular/material/stepper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {DatePipe} from "@angular/common";
import {HttpXsrfInterceptorService} from "./interceptors/http-xsrf-interceptor.service";
import { MenuComponent } from './components/menu/menu.component';
import { MainPanelComponent } from './components/main-panel/main-panel.component';
import { AgentListeComponent } from './components/admin/agent-liste/agent-liste.component';
import { ListeCreditsComponent } from './components/liste-credits/liste-credits.component';
import { ListeRemboursementsComponent } from './components/liste-remboursements/liste-remboursements.component';
import { ListeApplicantsComponent } from './components/liste-applicants/liste-applicants.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddEditAgentComponent } from './components/add-edit-agent/add-edit-agent.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
 import { SidenavComponent } from './composants/manager/sidenav/sidenav.component';
import { BodyComponent } from './components/body/body.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AccueilComponent } from './composants/manager/accueil/accueil.component';
import { SettingsComponent } from './composants/agent/settings/settings.component';
import { ManagerComponent } from './components/admin/manager/manager.component';
import { AddEditManagerComponent } from './components/add-edit-manager/add-edit-manager.component';
import { AddEditApplicantComponent } from './components/add-edit-applicant/add-edit-applicant.component';
import { AddEditCreditComponent } from './components/add-edit-credit/add-edit-credit.component';
import { AddEditEndorserComponent } from './components/add-edit-endorser/add-edit-endorser.component';
import { ListeEndorserComponent } from './components/liste-endorser/liste-endorser.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AgentHomeComponent } from './pages/agent-home/agent-home.component';
import { EditCreditComponent } from './components/edit-credit/edit-credit.component';
import { HeaderComponent } from './composants/agent/header/header.component';
 import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { LoansPerMounthComponent } from './components/statistiques/loans-per-mounth/loans-per-mounth.component';
import { LoansPerRemboursementComponent } from './components/statistiques/loans-per-remboursement/loans-per-remboursement.component';
import { LoansPerSexComponent } from './components/statistiques/loans-per-sex/loans-per-sex.component';
import { ChartModule } from 'angular-highcharts';
import { AccueilAgentComponent } from './composants/agent/accueil-agent/accueil-agent.component';
import { LoansPerProfessionComponent } from './components/statistiques/loans-per-profession/loans-per-profession.component';
import { LoansPerAgentComponent } from './components/statistiques/loans-per-agent/loans-per-agent.component';
import { ApplicantProfileComponent } from './components/applicant-profile/applicant-profile.component';
 import { AddAgentComponent } from './composants/agent/add-agent/add-agent.component';
import { EditAgentComponent } from './composants/agent/edit-agent/edit-agent.component';
import { AddManagerComponent } from './composants/manager/add-manager/add-manager.component';
import { EditManagerComponent } from './composants/manager/edit-manager/edit-manager.component';
import { ManagerListerComponent } from './composants/manager/manager-lister/manager-lister.component';
import { AgentListComponent } from './composants/agent/agent-list/agent-list.component';
import { HowUseItComponent } from './composants/General/how-use-it/how-use-it.component';
import { StatistiqueComponent } from './composants/manager/statistique/statistique.component';
 import { ManagerHeaderComponent } from './composants/manager/manager-header/manager-header.component';
import { AgentPanelComponent } from './composants/agent/agent-panel/agent-panel.component';
import { ManPanelComponent } from './composants/manager/man-panel/man-panel.component';
import { SideNavAgentComponent } from './composants/agent/side-nav-agent/side-nav-agent.component';
import { AgentSettingsComponent } from './composants/agent/agent-settings/agent-settings.component';
import { ManageSettingsComponent } from './composants/manager/manage-settings/manage-settings.component';
import { AddCreditComponent } from './composants/Credits/add-credit/add-credit.component';
import { UpdateCreditComponent } from './composants/Credits/update-credit/update-credit.component';
import { ListeCreditComponent } from './composants/Credits/liste-credit/liste-credit.component';
import { AddEditLevelComponent } from './composants/add-edit-level/add-edit-level.component';
import { AddEditLevelFormule2Component } from './composants/add-edit-level-formule2/add-edit-level-formule2.component';
import { AddCreditComponent2Component } from './composants/add-credit-component2/add-credit-component2.component';
import { AddCredi2Component } from './composants/Credits/add-credi2/add-credi2.component';
import { ViewLoanDetailsComponent } from './composants/Credits/view-loan-details/view-loan-details.component';
import { SHowIComponent } from './composants/General/show-i/show-i.component';
import { ShowImgComponent } from './composants/General/show-img/show-img.component';
import { ShowPDFComponent } from './composants/General/show-pdf/show-pdf.component';
import { ViewPDFComponent } from './composants/General/view-pdf/view-pdf.component';
import { ViewImgComponent } from './composants/General/view-img/view-img.component';
import { CalendarComponent } from './composants/General/calendar/calendar.component';
import { SafePipeModule } from 'safe-pipe';
import { ImportFIleComponent } from './composants/General/import-file/import-file.component';
import { RepaymentComponent } from './composants/Credits/repayment/repayment.component';
import { ViewApplicantAntecedantComponent } from './composants/Credits/view-applicant-antecedant/view-applicant-antecedant.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ViewRetardsComponent } from './composants/Credits/view-retards/view-retards.component';
import { ListeCredit2Component } from './composants/Credits/liste-credit2/liste-credit2.component';
import { LoanPerFormuleComponent } from './components/statistiques/loan-per-formule/loan-per-formule.component';
import { GelerLoanComponent } from './composants/General/geler-loan/geler-loan.component';
import { PrintEtatComponent } from './composants/General/print-etat/print-etat.component';
import { EditCreditCreditComponent } from './composants/General/edit-credit-credit/edit-credit-credit.component';

  export function createTranslateLoader(httpClient: HttpClient){
  return new TranslateHttpLoader(httpClient,'./assets/i18n/','.json')

}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    MainPanelComponent,
    AgentListeComponent,
    ListeCreditsComponent,
    ListeRemboursementsComponent,
    ListeApplicantsComponent,
    ToolbarComponent,
    AddEditAgentComponent,
    SidenavComponent,
    BodyComponent,
    AccueilComponent,
    SettingsComponent,
    AddEditManagerComponent,
    ManagerComponent,
    AddEditApplicantComponent,
    AddEditCreditComponent,
    AddEditEndorserComponent,
     ListeEndorserComponent,
     SideNavAgentComponent,
     AgentHomeComponent,
     EditCreditComponent,
     HeaderComponent,
      LoansPerMounthComponent,
     LoansPerRemboursementComponent,
     LoansPerSexComponent,
     AccueilAgentComponent,
     LoansPerProfessionComponent,
     LoansPerAgentComponent,
     ApplicantProfileComponent,
      AddAgentComponent,
     EditAgentComponent,
     AddManagerComponent,
     EditManagerComponent,
     ManagerListerComponent,
     AgentListComponent,
     HowUseItComponent,
      StatistiqueComponent,
      ManagerHeaderComponent,
      AgentPanelComponent,
      ManPanelComponent,
      AgentSettingsComponent,
      ManageSettingsComponent,
      AddCreditComponent,
      UpdateCreditComponent,
      ListeCreditComponent,
      AddEditLevelComponent,
      AddEditLevelFormule2Component,
      AddCreditComponent2Component,
      AddCredi2Component,
      ViewLoanDetailsComponent,
      SHowIComponent,
      ShowImgComponent,
      ShowPDFComponent,
      ViewPDFComponent,
      ViewImgComponent,
      CalendarComponent,
      ImportFIleComponent,
      RepaymentComponent,
      ViewApplicantAntecedantComponent,
      ViewRetardsComponent,
      ListeCredit2Component,
      LoanPerFormuleComponent,
      GelerLoanComponent,
      PrintEtatComponent,
      EditCreditCreditComponent,
      
   
    
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatSnackBarModule,
    FormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    HttpClientModule,
    MatMenuModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDividerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatSlideToggleModule,
    ChartModule,
    SafePipeModule,
    MatExpansionModule,
    MatProgressBarModule,
    HttpClientXsrfModule.withOptions({
      cookieName:'csrftoken'
    }),
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory:(createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS, useClass : HttpXsrfInterceptorService,multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
