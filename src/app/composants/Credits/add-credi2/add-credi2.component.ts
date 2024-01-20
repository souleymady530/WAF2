import { Component, Inject, OnInit, Pipe, PipeTransform,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
 import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/components/core/snackbar.service'; 
import { DatePipe } from '@angular/common';
import { CreditService } from 'src/app/services/Credit/credit.service';
import { ApplicantService } from 'src/app/services/Applicants/applicant.service';
import { EndorserService } from 'src/app/services/Endorser/endorser.service';
import { Observable } from 'rxjs';
 import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { FormControl } from '@angular/forms';
import { SecteurServicesService } from 'src/app/services/local-services/secteur-services.service';
import { FormuleServicesService } from 'src/app/services/local-services/formule-services.service';
import { Formule2ServiceService } from 'src/app/services/local-services/formule2-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
 


import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import { NotificationsService } from 'src/app/services/Notifications/notifications.service';




@Component({
  selector: 'app-add-credi2',
  templateUrl: './add-credi2.component.html',
  styleUrls: ['./add-credi2.component.css']
  
})
export class AddCredi2Component implements OnInit
{
  @ViewChild(MatAccordion) accordion: MatAccordion;
  is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false

   current_app!:any
    
  liste_applicants!:any
  user=JSON.parse(localStorage.getItem("currentUser"));
  max_rate=0.30
  extension_duree!:any;
  duree_sup=0;
  rate_sup=0
  taux_sans_supp=0
  thirdFormGroup!:any
  formule2!:any;
  formule1!:any;
  loan_list!:any;
  img_name="Aucune image"
  errors_tab!:any
  loan_rate=0
  total_payment!:any
  nbre_semaine!:any
  tranchePerWeek!:any
  nbre_credits_applicants=0
  nbre_credits_total_applicants=0

  nbre_mois=0
  tranchePerMounth=0


   isLinear = true;
   firstFormGroup = this.form_builder.group({
    
     
     app_nic_number:[null,[Validators.required,Validators.minLength(6),Validators.maxLength(100)]],
     
   });
   
   secondFormGroup = this.form_builder.group({
    

    is_active: false,
    loan_type:[null,[Number,Validators.required]],
    loan_amount:[null,[Number,Validators.required]],
    loan_rate:[{value: '00000', disabled: false}, Validators.required],
    repayment_amount:[{value: '00000', disabled: false}, Validators.required],
    type_repayement:['Hebdomadaire',[Validators.required]],
    loan_delay:[{value: '00000', disabled: false}, Validators.required],
    type_duree:[{value: 'Hebdomadaire', disabled: false}, Validators.required],
    created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
});

   constructor(private form_builder:FormBuilder,
    private credit_service:CreditService,
    private secteur$:SecteurServicesService,
    private formule_service:FormuleServicesService,
   private applicants_service:ApplicantService,
   private endorser_service:EndorserService,
   private formule1$:FormuleServicesService,
   private formule2$:Formule2ServiceService,
    private route:Router,
    private notification$:NotificationsService,
    private snacbar:SnackbarService,private datePipe:DatePipe)
  {
   
  }

  //this check if applicant is truly new
  check_if_applicant(evt){
    let nic_num=this.firstFormGroup.value.app_nic_number
    this.nbre_credits_total_applicants=0
    this.current_app=null
    //console.log( this.credit_service.get_by_nic_number(nic_num))
     this.credit_service.get_credits().subscribe({
       next:(val)=>{
         //console.log('------------initi-------------')
         val.forEach(element => {
          // console.log(element.applicant.nic_number)
           if(element.applicant.nic_number==nic_num)
              {
               this.current_app=element
               this.save()
                 console.log('Cet utilisateur a deja pris un credit avec save africa')    
              }
         });
        // console.log(this.current_app.applicant)
        },
       error:console.log,
       complete:()=>{console.log("---------------fin de requete---------------")}
     })
     //console.log(this.current_app)
   }

   make_loan_with(id:any){

   }

   view_resume_of(id:any){
    if(this.user.user.is_manager)  this.route.navigateByUrl('/dashboard/applicantdetails/'+id)
    else   this.route.navigateByUrl('/agent-home/applicantdetails/'+id)
   }
  ngOnInit(): void {


    
      
     
    /*this.firstFormGroup = this.form_builder.group({
    
      // app_email:[null,[Validators.email]],
       app_first_name: [null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
       app_last_name:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
       app_gender: 'M',
       app_d_naissance:Date,
       app_phone_number:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
       app_nic_number:[null,[Validators.required,Validators.minLength(6),Validators.maxLength(100)]],
       app_profile_image:"",
       app_address:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
       app_city:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
       app_state:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
       app_point:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
       app_wave_phone_number: "",
       app_profession: [null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
   
       app_secondary_profession: [null],
       app_conjoint: [null],
       participation_conjoint: [null],
       app_epargne: [null],
       app_epargne_hateur: [null],
       app_experience: [null],
       app_experience_statut: [null],
       app_experience_structure: [null],
       app_experience_structure_name: [null],
   
   
      // app_revenue: [null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
       app_profile: [null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
       app_business_line: [null,[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
       app_created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
     });
     this.secondFormGroup = this.form_builder.group({
        
       first_name:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
       last_name:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
       gender:'',
       d_naissance:Date,
       phone_number:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
       endorser_nic_image:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
       endorser_nic_number:[null,[Validators.required,Validators.minLength(6),Validators.maxLength(100)]],
       profession:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
       address:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(255)]],
       city:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(255)]],
       state:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(255)]],
       point:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(255)]],
       created_date:Date ,
     });
   
     this.thirdFormGroup = this.form_builder.group({
       
   
           is_active: false,
           loan_type:[null,[Number,Validators.required]],
           loan_amount:[null,[Number,Validators.required]],
           loan_rate:[{value: '00000', disabled: true}, Validators.required],
           repayment_amount:[{value: '00000', disabled: true}, Validators.required],
           type_repayement:[null,[String,Validators.required]],
           loan_delay:[{value: '00000', disabled: true}, Validators.required],
           type_duree:[{value: 'Hebdomadaire', disabled: true}, Validators.required],
           created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
     });
   */
  }

  load_loans_list(evt)
  {
    if(evt=='Formule Classique')
    {
      this.formule1$.get_formule().subscribe({
        next:(loans)=>{
          this.loan_list=loans
        },
        error:console.log,
        complete:()=>console.log('Fin de requete')
      })
    }
    else if(evt=='Formule 2')
    {
        this.formule2$.get_formule().subscribe({
          next:(loans)=>{
            this.loan_list=loans
          },
          error:console.log,
          complete:()=>console.log('Fin de requete')
        })
    }
    
  }
//B53434223
  load_loan_details(evt){
    const formule=''+this.secondFormGroup.value.loan_type
    this.nbre_credits_applicants=0
    if(formule=="Formule Classique")
      {
         
          this.formule1$.get_formule().subscribe({
            next:(val)=>{
            
                val.forEach(element => {
                  if(element.Pret==evt)
                  {
                   // recherche du nombre de credit de la applicant
                   this.credit_service.get_credits().subscribe({
                    next:(val)=>{
                        val.forEach(elm => {
                            if(elm.applicant.nic_number==this.current_app.applicant.nic_number && Number(elm.loan_amount)==Number(evt) && elm.loan_statut==5) this.update_nbre_credit_par_pret()
                        });
                      /**
                       *  "Palier": "Niveau superieur 3",
                          "Pret": 750000,
                          "TauxEmprunt1": 0.299,
                          "TauxEmprunt2": 0.279,
                          "TauxEmprunt3": 0.269,
                          "TauxNormal": 0.25,
                          "DureeHebdoEmprunt1": 25,
                          "DureeHebdoEmprunt2": 25,
                          "DureeHebdoEmprunt3": 26,
                          "DureeHebdoNormale": 26,
                          "DureeEnMoisNormale": 6,
                       */
                          let pas=0;
                           //this.nbre_credits_applicants++;
                           //Premier emprunt pour ce montant
                            if(this.nbre_credits_applicants==0)
                            {
                                  this.secondFormGroup.value.loan_rate=element.TauxEmprunt1
                                  this.loan_rate=element.TauxEmprunt1
                                  this.taux_sans_supp=element.TauxEmprunt1
                                  this.total_payment=Number(evt)+(evt*element.TauxEmprunt1)
                                  if(this.secondFormGroup.value.type_repayement==String("Hebdomadaire"))
                                  {
                                    this.nbre_semaine=element.DureeHebdoEmprunt1
                                    this.tranchePerWeek=(evt+(evt*element.TauxEmprunt1))/element.DureeHebdoEmprunt1
                                    pas=0.01
                                  }
                                  else if(this.secondFormGroup.value.type_repayement=="Mensuel")
                                  {
                                    this.nbre_mois=element.DureeEnMoisNormale
                                    this.tranchePerMounth=(evt+(evt*element.TauxEmprunt1))/element.DureeEnMoisNormale
                                    pas=0
                                  }

                                 
                                  console.log('----pas '+pas)
                                  
                            }

                            //2eme emprunt pour ce montant
                            else if(this.nbre_credits_applicants==1)
                            {
                              
                                  this.secondFormGroup.value.loan_rate=element.TauxEmprunt2
                                  this.loan_rate=element.TauxEmprunt2
                                  this.taux_sans_supp=element.TauxEmprunt2
                                  this.total_payment=Number(evt)+(evt*element.TauxEmprunt2)
                              
                                if(this.secondFormGroup.value.type_repayement==String("Hebdomadaire"))
                                {
                                  this.nbre_semaine=element.DureeHebdoEmprunt2
                                  this.tranchePerWeek=(evt+(evt*element.TauxEmprunt2))/element.DureeHebdoEmprunt2
                                  pas=0.01
                                }
                                else if(this.secondFormGroup.value.type_repayement=="Mensuel"){
                                  this.nbre_mois=element.DureeEnMoisNormale
                                  this.tranchePerMounth=(evt+(evt*element.TauxEmprunt2))/element.DureeEnMoisNormale
                                  pas=0.0435
                                }
                               // let pas=this.secondFormGroup.value.type_repayement=="Mensuel"? 0.0435:0.01
                                console.log('----pas '+pas)
                            }

                            //3eme emprunt pour ce montant
                            else if(Number(this.nbre_credits_applicants)==2)
                            {
                                 
                                this.secondFormGroup.value.loan_rate=element.TauxEmprunt3
                                this.loan_rate=element.TauxEmprunt3
                                this.taux_sans_supp=element.TauxEmprunt3
                                this.total_payment=Number(evt)+(evt*element.TauxEmprunt3)

                                if(this.secondFormGroup.value.type_repayement=="Hebdomadaire")
                                {
                                  this.nbre_semaine=element.DureeHebdoEmprunt3
                                  this.tranchePerWeek=(evt+(evt*element.TauxEmprunt3))/element.DureeHebdoEmprunt3
                                  pas=0.01
                                }
                                else if(this.secondFormGroup.value.type_repayement=="Mensuel"){
                                  this.nbre_mois=element.DureeEnMoisNormale
                                  this.tranchePerMounth=(evt+(evt*element.TauxEmprunt3))/element.DureeEnMoisNormale
                                  pas=0.0435
                                }
                                //let pas=this.secondFormGroup.value.type_repayement=="Mensuel"? 0.0435:0.01
                               // console.log('----pas '+pas)
                          }

                          //4eme emprunt pour ce montant  emprunt normal
                          else if(this.nbre_credits_applicants>=4)
                          {
                                this.secondFormGroup.value.loan_rate=element.TauxNormal
                                this.loan_rate=element.TauxNormal
                                this.taux_sans_supp=element.TauxNormal
                                this.total_payment=Number(evt)+(evt*element.TauxNormal)

                                if(this.secondFormGroup.value.type_repayement=="Hebdomadaire")
                                {
                                  this.nbre_semaine=element.DureeHebdoNormale
                                  this.nbre_mois=0
                                  this.tranchePerWeek=(evt+(evt*element.TauxNormal))/element.DureeHebdoNormale
                                  pas=0.01
                                }
                                else if(this.secondFormGroup.value.type_repayement=="Mensuel"){
                                  this.nbre_mois=element.DureeEnMoisNormale
                                  this.nbre_semaine=0
                                  this.tranchePerMounth=(evt+(evt*element.TauxNormal))/element.DureeEnMoisNormale
                                  pas=0.0435
                                }
                              //  let pas=this.secondFormGroup.value.type_repayement=="Mensuel"? 0.0435:0.01
                               // console.log('----pas '+pas)
                          }
/**
 *   "TauxEmprunt1": 0.299,
      "TauxEmprunt2": 0.279,
      "TauxEmprunt3": 0.269,
      "TauxNormal": 0.25,
      "DureeHebdoEmprunt1": 25,
      "DureeHebdoEmprunt2": 25,
      "DureeHebdoEmprunt3": 26,
      "DureeHebdoNormale": 26,
      "DureeEnMoisNormale": 6,
 */
                          
                          



                          let rate_plage=this.max_rate-Number(this.loan_rate)
                          console.log(rate_plage+' est la plage')
                          let nbre_semaine_extension=0
                          if(pas!==0)         nbre_semaine_extension=Math.round(Number(rate_plage)/pas)
                          
                          let max=nbre_semaine_extension>4? 4: nbre_semaine_extension
                            this.extension_duree=Array.from({length: max}, (v, k) => k+1
                            ); 
                            this.duree_sup=0
                            this.rate_sup=0
                    },
                    error:console.log
                   })


                  
                   
                   
                  }
                });
              
            },
            error:console.log,
            complete:()=>console.log('Fin de requete')
          })
      }
      
      else if(formule=="Formule 2"){
        this.formule2$.get_formule().subscribe({
          next:(val)=>{
           
              val.forEach(element => {
                  if(element.Pret==evt)
                    {
                        // recherche du nombre de credit de la applicant
                        this.credit_service.get_credits().subscribe({
                          next:(val)=>{
                              val.forEach(element =>
                                 {
                                  if(element.applicant.nic_number==this.firstFormGroup.value.app_nic_number && element.loan_amount==evt && element.loan_statut==5) this.update_nbre_credit_par_pret()
                              });

                              //calcul des parametres du pret
                              if(this.nbre_credits_applicants<=6)
                              {
                                    this.secondFormGroup.value.loan_rate=element.TauxEmprunt1a6
                                    this.loan_rate=element.TauxEmprunt1a6
                                    this.total_payment=Number(evt)+(evt*element.TauxEmprunt1a6)
                                    this.nbre_mois=element.DureeMois
                                    this.tranchePerMounth=(evt+(evt*element.TauxEmprunt1a6))/element.DureeMois
                                    this.nbre_semaine=0
                              }
                                
                              else 
                              {
                                    this.secondFormGroup.value.loan_rate=element.TauxNormal
                                    this.loan_rate=element.TauxNormal
                                    this.total_payment=Number(evt)+(evt*element.TauxNormal)
                                    this.nbre_mois=element.DureeMois
                                    this.nbre_semaine=0
                                    this.tranchePerMounth=(evt+(evt*element.TauxNormal))/element.DureeMois
                              }
                          },
                          error:console.log
                        })

                        this.extension_duree=new Array()
                    }
              });
            
           },
          error:console.log,
          complete:()=>console.log('Fin de requete')
        })
      }
   }

   valider(){
    let   address=this.current_app.address,
    city=this.current_app.city,
    state=this.current_app.state,
    point=this.current_app.point;

    let indice=this.current_app.indice_age
    let indice_charge=this.current_app.indice_charge

    const data={
      applicant: 
      {
        //email:this.firstFormGroup.value.app_email,
        first_name:this.current_app.applicant.first_name,
        last_name:this.current_app.applicant.last_name,
        gender:this.current_app.applicant.gender,
        d_naissance:this.current_app.applicant.d_naissance,
        phone_number:this.current_app.applicant.phone_number,
        
        indice_age:indice,
        indice_charge:indice_charge,


        nic_number:this.current_app.applicant.nic_number,
        nic_image:this.current_app.applicant.nic_image,
        location:{
            address: address,
            city: city,
            state: state,
            point: point,
          },
        wave_phone_number:this.current_app.applicant.wave_phone_number ,
        profession: this.current_app.applicant.profession,

        app_secondary_profession:this.current_app.applicant.app_secondary_profession ,
        app_conjoint: this.current_app.applicant.app_conjoint,
        participation_conjoint:this.current_app.applicant.participation_conjoint,
        app_epargne:this.current_app.applicant.app_epargne,
        app_epargne_hateur:this.current_app.applicant.app_epargne_hateur,
        app_experience:this.current_app.applicant.app_experience,
        app_experience_statut:this.current_app.applicant.app_experience_statut ,
        app_experience_structure:this.current_app.applicant.app_experience_structure,
        app_experience_structure_name: this.current_app.applicant.app_experience_structure_name,
        
         
        profile: null,
        business_line:this.current_app.applicant.business_line ,
        created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      },
      endorser: {
        first_name:this.current_app.endorser.first_name,
        last_name:this.current_app.endorser.last_name,
        gender:this.current_app.endorser.gender,
        d_naissance:this.current_app.endorser.d_naissance,
        phone_number:this.current_app.endorser.phone_number,
        endorser_nic_image:this.current_app.endorser.endorser_nic_image,
        endorser_nic_number:this.current_app.endorser.endorser_nic_number,
        profession:this.current_app.endorser.profession,
        
        created_date:Date ,
      },
      recommending_agent: this.user.user.id? this.user.user.id:1,
      is_active: false,
      loan_score:0,
      loan_score_supp:0,
      loan_statut:1,
      loan_rate:this.loan_rate ,
      loan_type:this.secondFormGroup.value.loan_type ,
      loan_delay:this.nbre_semaine!=0? this.nbre_semaine:this.nbre_mois,
      contrat_non_signe: null,
      contrat_signe: null,
      loan_amount:Number(this.secondFormGroup.value.loan_amount),
      type_duree:this.secondFormGroup.value.type_duree,
      repayment_amount:this.total_payment,
      created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    }


   

    
    console.log('-----------------------------------------')
    console.log(data);
     this.credit_service.add_credits(data).subscribe({
      next:(val)=>{
        //notification
        console.log('Demande de credit effectue avec succes')
        this.snacbar.openSnackBar('Demande de crédits envoyé avec succes')
        const data={
          "type":"Credit",
          "details":"Une nouvelle demande de credit a ete fait par agent:"+this.user.user.first_name,
          "date":this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
          'to':'manager',
          "lu":false,
          
        }
        this.notification$.add_notifications(data).subscribe({
          next:(val)=>{
            console.log('Notifications envoye');
          },
          error:console.log
        })
      },
      error:console.log,
      complete:()=>console.log('Fin de requete')
    })
     

   }

   save(){
    this.nbre_credits_total_applicants++
     
   }

   update_nbre_credit_par_pret(){
    this.nbre_credits_applicants++;
    }

    load_extension_details(evt){
      if(''+this.secondFormGroup.value.loan_type=='Formule Classique')
      {

        this.duree_sup=evt  
        //this.thirdFormGroup.value.loan_rate=Number(this.loan_rate)+Number(this.duree_sup)*0.01   
        if(this.secondFormGroup.value.type_duree=='Hebdomadaire')        this.loan_rate=Number(this.taux_sans_supp)+Number(this.duree_sup)*0.01
        if(this.secondFormGroup.value.type_duree=='Mensuel')        this.loan_rate=Number(this.taux_sans_supp)+Number(this.duree_sup)*0.435
      }
      else
      {
        this.duree_sup=0
        this.loan_rate=this.thirdFormGroup.value.loan_rate
      }
      
   }
}
