import { Component, Inject, OnInit, Pipe, PipeTransform,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
 import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/components/core/snackbar.service'; 
import { DatePipe ,formatDate} from '@angular/common';
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
import { NotificationsService } from 'src/app/services/Notifications/notifications.service';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
 


@Component({
  selector: 'app-edit-credit-credit',
  templateUrl: './edit-credit-credit.component.html',
  styleUrls: ['./edit-credit-credit.component.css']
})
export class EditCreditCreditComponent {
  is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false
  user=JSON.parse(localStorage.getItem("currentUser"));
  //[Validators.required,Validators.minLength(4),Validators.maxLength],
  @ViewChild(MatAccordion) accordion: MatAccordion;
  is_old_client=false
  validate=false
  data!:any
  credit_form!:FormGroup;
  applicants_list!:Array<any>;
  endorsers_liste!:Array<any>;
  les_secteurs!:Array<any>;
  max_rate=0.30
  formule2!:any;
  formule1!:any;
  loan_list!:any;
  extension_duree!:any;
  duree_sup=0;
  rate_sup=0
  img_name="Photo de la piece"
  errors_tab!:any
  taux_sans_supp=0
  loan_rate!:number
  total_payment!:any
  nbre_semaine!:any
  tranchePerWeek!:any
  lat=0
  lon=0
  during_type='Hebdomadaire'
 private selectedFile:File=null;
 private srcResult:any;

 private srcResult2:any;
 img_name2="Photo de la piece"
  

 lastFormGroup=this.form_builder.group({ is_all_valide: [null,[]]});
   firstFormGroup = this.form_builder.group({
    
   // app_email:[null,[Validators.email]],
    first_name: [null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    last_name:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    gender: 'M',
    d_naissance:Date,
    phone_number:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
    nic_number:[null,[Validators.required,Validators.minLength(6),Validators.maxLength(100)]],
    profile_image:"",
    address:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    city:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    state:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    point:[null,[Validators.minLength(2),Validators.maxLength(100)]],
   // app_wave_phone_number: "",
    profession: [null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],

    app_secondary_profession: "",
    app_conjoint: "",
    participation_conjoint: "",
    app_epargne: "",
    app_epargne_hateur: "",
    app_experience: "",
    app_experience_statut: "",
    app_experience_structure: "",
    app_experience_structure_name: "",


   // app_revenue: [null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    profile: [null,[Validators.minLength(2),Validators.maxLength(100)]],
    business_line: [null,[Validators.minLength(2),Validators.maxLength(20)]],
    created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
  });
  secondFormGroup = this.form_builder.group({
     
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
    point:[null,[Validators.minLength(2),Validators.maxLength(255)]],
    created_date:this.datePipe.transform(new Date(), 'yyyy-MM-dd') ,
  });

  thirdFormGroup = this.form_builder.group({
    

        is_active: false,
        loan_type:'',
        loan_amount:'',
        loan_rate:0,
        repayment_amount:0,
        type_repayement: 0,
        loan_delay:0,
        type_duree:[{value: 'Hebdomadaire'}],
      
        created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
  });


  isLinear = false;


  constructor(private form_builder:FormBuilder,private datePipe:DatePipe,
    private credit_service:CreditService
    ,private route:ActivatedRoute,
   
    private secteur$:SecteurServicesService,
    private formule_service:FormuleServicesService,
   private applicants_service:ApplicantService,
   private endorser_service:EndorserService,
   private formule1$:FormuleServicesService,
   private formule2$:Formule2ServiceService,
   private notification$:NotificationsService,
   
    private snacbar:SnackbarService

    )
  {
    console.log(this.route.snapshot.params['id'])
    this.credit_service.get_by_id(this.route.snapshot.params['id']).subscribe({
      next:(val)=>{
        this.save_data(val);
      }
    })
  }
  save_data(data){
    this.data=data
    this.firstFormGroup.patchValue(data.applicant)
    this.secondFormGroup.patchValue(data.endorser)
    //this.thirdFormGroup.value.loan_amount=data.loan_amount
    this.thirdFormGroup.patchValue(data)
  }
  onFileSelected(forWho:any) { 
    if(forWho=='applicant'){
      const inputNode: any = document.querySelector('#file1');
  
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
    
        reader.onload = (e: any) => {
          this.srcResult = e.target.result;
          this.img_name=inputNode.files[0].name 
        };
    
        reader.readAsArrayBuffer(inputNode.files[0]);
      }
    }
    else if(forWho=='endorser'){
      const inputNode: any = document.querySelector('#file2');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult2 = e.target.result;
        this.img_name2=inputNode.files[0].name 
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
    }
    
  }


  ngOnInit(): void {
   
   this.define_lists();
   this.get_sector();
    this.ViewCoOrdinate()
  }
  get_sector(){ 
    
    this.les_secteurs=new Array()
    this.secteur$.get_secteurs().subscribe({
      next:(all_sector)=>{
       
       
        for(let i=0;i<all_sector.length;i++)
      {
        let secteur=Object.keys(all_sector[i])[0]
       
        let sous_secteurs=Object.values(all_sector[i][secteur]);
        for (let j=0;j<sous_secteurs.length;j++)
          this.les_secteurs.push(secteur+' - '+sous_secteurs[j])
         
         
        
      }

      },
      error:console.log,
      complete:()=>console.log('------------------Completed request----------------------')
    })
     
  }
  
  ViewCoOrdinate() {
    if (navigator.geolocation) {
      
      navigator.geolocation.getCurrentPosition((position: any) => {this.lat=position.coords.latitude,this.lon=position.coords.longitude});
  
    } else {
        alert('Geo Location feature is not supported in this browser.');
    }
  
    return false;
  }

  
  valider(){

    this.ViewCoOrdinate();
    
   




    var naissance=Date.parse( ''+this.firstFormGroup.get('d_naissance').value)
    var val = formatDate(naissance,'yyyy/MM/dd','en').split('/')[0];
    let to_day=this.datePipe.transform(new Date(),'yyyy-MM-dd').split('-')[0]  ;
    const age=Number(to_day)-Number(val)
    let indice=0;
    if(age<50) indice=3
    else if(age>=50 && age<60) indice=2
    else if(age>=60) indice=1
    let indice_charge=0
    if(this.firstFormGroup.value.participation_conjoint=='Oui') indice_charge=2
    else if(this.firstFormGroup.value.participation_conjoint=='Non') indice_charge=1
 
          const data2={
          applicant: 
          {
            //email:this.firstFormGroup.value.app_email,
            first_name:this.firstFormGroup.value.first_name,
            last_name:this.firstFormGroup.value.last_name,
            gender:this.firstFormGroup.value.gender,
            d_naissance:this.firstFormGroup.value.d_naissance,
            phone_number:this.firstFormGroup.value.phone_number,
            indice_age:indice,
            indice_charge:indice_charge,
           
            nic_number:this.firstFormGroup.value.nic_number,
            nic_image:this.firstFormGroup.value.profile_image,
            location:{
                address:this.firstFormGroup.value.address,
                city:this.firstFormGroup.value.city,
                state:this.firstFormGroup.value.state,
                point:
                  {
                    "type": "Point",
                    "coordinates": [
                      this.lat,
                      this.lon
                    ]
                  }
              },
           // wave_phone_number: this.firstFormGroup.value.app_wave_phone_number,
            profession: this.firstFormGroup.value.profession,

            app_secondary_profession: this.firstFormGroup.value.app_secondary_profession,
            app_conjoint: this.firstFormGroup.value.app_conjoint,
            participation_conjoint: this.firstFormGroup.value.participation_conjoint,
            app_epargne: this.firstFormGroup.value.app_epargne,
            app_epargne_hateur: this.firstFormGroup.value.app_epargne_hateur,
            app_experience: this.firstFormGroup.value.app_experience,
            app_experience_statut: this.firstFormGroup.value.app_experience_statut,
            app_experience_structure: this.firstFormGroup.value.app_experience_structure,
            app_experience_structure_name: this.firstFormGroup.value.app_experience_structure_name,
            
             
            profile: this.firstFormGroup.value.profile,
            business_line: this.firstFormGroup.value.business_line,
            created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
          },
          endorser: {
            first_name:this.secondFormGroup.value.first_name,
            last_name:this.secondFormGroup.value.last_name,
            gender:this.secondFormGroup.value.gender,
            d_naissance:this.secondFormGroup.value.d_naissance,
            phone_number:this.secondFormGroup.value.phone_number,
            endorser_nic_image:this.secondFormGroup.value.endorser_nic_image,
            endorser_nic_number:this.secondFormGroup.value.endorser_nic_number,
            profession:this.secondFormGroup.value.profession,
            
            created_date:Date ,
          },
          recommending_agent: this.user.user.id? this.user.user.id:1,
          is_active: false,
          loan_score:0,
          loan_statut:1,
          loan_amount: Number(this.thirdFormGroup.value.loan_amount),
          loan_rate:Number(this.loan_rate),
          loan_type: this.thirdFormGroup.value.loan_type,
          loan_delay: Number(this.nbre_semaine)+Number(this.duree_sup),
          contrat_non_signe: null,
          contrat_signe: null,
         
          type_duree:this.thirdFormGroup.value.loan_type=='Formule 2'? 'Mensuel':'Hebdomadaire',
          repayment_amount:Number(this.thirdFormGroup.value.loan_amount)+(Number(this.thirdFormGroup.value.loan_amount)*Number(this.loan_rate)),
          created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
        }
        /*
        console.log('---------data format-------------')
         console.log(data2)*/
     this.credit_service.update_credits(this.data.id,data2).subscribe({
        next:(val)=>{
          this.snacbar.openSnackBar("Details Credits ajoutés avec succès et attente de confirmation")
          const data={
            "type":"Credit",
            "details":"Une demande de credit a ete mise a jour par agent:"+this.user.user.first_name,
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
         // this.disable_btn();
        /* if(this.user.user.is_manager)  this.route.navigateByUrl('/dashboard/accueil')
         else   this.route.navigateByUrl('/agent-home/accueil')*/
          
        },
        error:console.log
      })
       
  }

  disable_btn(){this.validate=true}


  define_lists()
  {
    this.applicants_service.get_applicants().subscribe(
      {
        next:(liste)=>{
          this.save_list(liste,1);
        }

      }
      
    );
    this.endorser_service.get_endorsers().subscribe({
      next:(liste)=>{
        this.save_list(liste,2);
      }
    })
  }


  save_list(liste,ind)
  {
    if(ind==1)
      this.applicants_list=liste;
    else
      this.endorsers_liste=liste;
  }

  load_loans_list(evt)
  {
    if(evt=='Formule Classique')
    {
      this.formule1$.get_formule().subscribe({
        next:(loans)=>{
          this.loan_list=loans
          this.during_type='Hebdomadaire'
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
            this.during_type='Mensuel'
          },
          error:console.log,
          complete:()=>console.log('Fin de requete')
        })
    }
    
  }

  //this check if applicant is truly new
  check_if_applicant(evt){
    this.is_old_client=false 
   let nic_num=this.firstFormGroup.value.nic_number
   //console.log( this.credit_service.get_by_nic_number(nic_num))
    this.credit_service.get_credits().subscribe({
      next:(val)=>{
        //console.log('------------initi-------------')
        val.forEach(element => {
         // console.log(element.applicant.nic_number)
          if(element.applicant.nic_number==nic_num)
             {
              
              console.log('Cet utilisateur a deja pris un credit avec save africa')  
              this.is_old_client=true  
             }
             
        });
        
      },
      error:console.log,
      complete:()=>{console.log("---------------fin de requete---------------")}
    })
  }

  add_for_old_client(){
   // if(this.user.user.is_manager)  this.route.navigateByUrl('/dashboard/oldaddcredits')
   // else   this.route.navigateByUrl('/agent-home/oldaddcredits')
    
   }


  submit_form( )
  {
    //verification pour voir si le client n avait pas fait de credit au par avant

    //si Oui alors calcul du nouveau montant en fonction du nombre de fois

    //si non alos calcul du montant pour la premiere demande

    //Statut credit egal a 1
     
    //calcul du montant


     
   const data2={
          
        gender:this.credit_form.value.gender,
        d_naissance:this.credit_form.value.d_naissance,
         
   }
     
      this.credit_service.add_credits(data2).subscribe(
        {
          next:(val)=>{
            this.snacbar.openSnackBar("Credit Enregistre avec succès")
            
           },
          error:console.log
          
        }
       )
    }
    
   //this function will load loan details into the bottom of thirdgroupe  loan_restitution type
   load_loan_details(evt){
    const formule=''+this.thirdFormGroup.value.loan_type

    if(formule=="Formule Classique")
      {
        console.log('Formule classique')
          this.formule1$.get_formule().subscribe({
            next:(val)=>{
            
                val.forEach(element => {
                  if(element.Pret==evt)
                  {
                   // console.log(element)
                    this.thirdFormGroup.value.loan_rate=element.TauxEmprunt1
                    this.loan_rate=element.TauxEmprunt1
                    this.taux_sans_supp=Number(element.TauxEmprunt1)
                    this.total_payment=Number(evt)+(evt*element.TauxEmprunt1)
                    this.nbre_semaine=element.DureeHebdoEmprunt1
                    //extension_duree
                    let rate_plage=this.max_rate-Number(this.loan_rate)
                    console.log(rate_plage+' est la plage')
                     
                    let nbre_semaine_extension=Math.round(Number(rate_plage)/0.01)
                   let max=nbre_semaine_extension>4? 4: nbre_semaine_extension
                    this.extension_duree=Array.from({length: max}, (v, k) => k+1
                    ); 
                    this.duree_sup=0
                    this.rate_sup=0

                    console.log(nbre_semaine_extension)
                    console.log('---------------------Extension------------------')
                    this.tranchePerWeek=(evt+(evt*element.TauxEmprunt1))/element.DureeHebdoEmprunt1

                  }
                });
              
            },
            error:console.log,
            complete:()=>console.log('Fin de requete')
          })
      }
      
      else if(formule=="Formule 2"){
        console.log('Formule 2')

        this.formule2$.get_formule().subscribe({
          next:(val)=>{
           
              val.forEach(element => {
                  if(element.Pret==evt)
                    {
                       
                      
                      this.loan_rate=element.TauxEmprunt1a6
                      this.taux_sans_supp=Number(element.TauxEmprunt1a6)

                      this.total_payment=Number(evt)+(evt*element.TauxEmprunt1a6)
                      this.nbre_semaine=element.DureeMois
                      this.tranchePerWeek=0

                      this.extension_duree=new Array()
                    }
              });
            
           },
          error:console.log,
          complete:()=>console.log('Fin de requete')
        })
      }
       
   }

   load_extension_details(evt){
      if(''+this.thirdFormGroup.value.loan_type=='Formule Classique')
      {

        this.duree_sup=evt  
        //this.thirdFormGroup.value.loan_rate=Number(this.loan_rate)+Number(this.duree_sup)*0.01   
        this.loan_rate=Number(this.taux_sans_supp)+Number(this.duree_sup)*0.01
      }
      else
      {

        this.duree_sup=0
        this.loan_rate=Number(this.taux_sans_supp)
      }
      
   }
    
}
