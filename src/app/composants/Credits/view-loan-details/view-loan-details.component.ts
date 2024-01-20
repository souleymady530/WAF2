 import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditService } from 'src/app/services/Credit/credit.service';
import { ShowImgComponent } from '../../General/show-img/show-img.component';
import { ShowPDFComponent } from '../../General/show-pdf/show-pdf.component';
import { ImportFIleComponent } from '../../General/import-file/import-file.component';
import { RepaymentComponent } from '../repayment/repayment.component';
import { DatePipe } from '@angular/common';
import { EcheanceService } from 'src/app/services/Echeance/echeance.service';
import { NotificationsService } from 'src/app/services/Notifications/notifications.service';
import { AgentService } from 'src/app/services/agent/agent.service';
 
@Component({
  selector: 'app-view-loan-details',
  templateUrl: './view-loan-details.component.html',
  styleUrls: ['./view-loan-details.component.css']
})
export class ViewLoanDetailsComponent implements OnInit {
  last_updated!:any
  loan!:any
  app_nic_img=''
  somme_a_rembourser=0
  tranche=0
  id_echeance
  date_creation=''
  agent_name=''
  is_all_ok=false
  old_credits_size=0
  id!:number
  nbre_echeance=0
  is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false
  user=JSON.parse(localStorage.getItem("currentUser"));
  is_man=this.user.user.is_manager? this.user.user.is_manager:false 
  old_credit!:Array<any>
  is_newly_generate=false
  toutes_les_echeances=Array()
  private tab_echeance=Array()
  private tab_echance_payement=new Array()
  private date!:Date
  private last_date!:any
endorser_nic_img='../../../../assets/images/desc.jpg'

  constructor(private agent$:AgentService,  private router:ActivatedRoute,private notification$:NotificationsService,private credit$:CreditService,private modal:MatDialog,private route:Router,private datePipe:DatePipe,private echance$:EcheanceService){
    
  
   this.id=this.router.snapshot.params['id']
   //console.log(this.id+'<---');
   this.credit$.get_by_id(this.id).subscribe({
     next:(loan)=>{
       //this.loan=loan
       this.somme_a_rembourser=Number(loan.loan_amount)+Number(loan.loan_rate*loan.loan_amount)
       this.tranche=Number(this.somme_a_rembourser/25)
       //console.log(loan)
       this.save_current_loan(loan)
          if(loan.loan_statut>=5){
            this.get_echeances()
           
        }
     },
     error:console.log,
     
   })

  
   this.old_credit=new Array()
   this.credit$.get_credits().subscribe({
     next:(val)=>{
       let old_loans=new Array()
        
         val.forEach(element => {
           

           if(element.applicant.nic_number==this.loan.applicant.nic_number)
           old_loans.push(element);
         });
        this.save_old_credits(old_loans)
     },
     error:console.log
   })
 
   
   
   //this.update_echeance();
  // console.log(this.toutes_les_echeances)
  }


  update_score(){
    
    //this will update score
    let score=0;
    let total_retard=0
    
    let i;
    for(i=0;i<this.toutes_les_echeances.length;i++){
      total_retard+=Number(this.toutes_les_echeances[i].retard)
    }
    //console.log(total_retard+' est le retard------')
    total_retard*=-1
    if(total_retard==0 && this.toutes_les_echeances[i-1].statut) score=5;
    else if(total_retard>0 && total_retard<7 && this.toutes_les_echeances[i-1].statut) score=4;
    else if(total_retard>=7 && total_retard<30 && this.toutes_les_echeances[i-1].statut) score=3;

    //calcul en fonction de l echeaance finale
   // console.log(this.toutes_les_echeances[i-1])
    let delai_derniere_echeance=new Date(this.toutes_les_echeances[i-1].date_delai_payement)
    let delai_payement_derniere_echeance=new Date(this.toutes_les_echeances[i-1].date_dernier_payement)
    const variation= delai_payement_derniere_echeance.getTime()-delai_derniere_echeance.getTime()
    const nbre_jour=Math.trunc(variation/(24*3600000))
   
    if(nbre_jour>0 && nbre_jour<=30 && this.toutes_les_echeances[i-1].statut) score=2
    if(nbre_jour>30 && nbre_jour<=60 && this.toutes_les_echeances[i-1].statut) score=1
    if(nbre_jour>60 && this.toutes_les_echeances[i-1].statut) score=-1
    if(nbre_jour<=-30 && this.toutes_les_echeances[i-1].statut) score=5
    this.loan.loan_score=score;
    this.loan.loan_score_supp=score==5? 1:0
      
    this.credit$.update_credits(this.loan.id,this.loan).subscribe({
      next:(val)=>{
        console.log('Score mise a jour');
      },
      error:console.log
    })
    
    //update score
  }
  update_echeance(){
    
  }
  save_laste_update(last_updated){
    this.last_updated=last_updated
  }
  reinitialize_echeance(numero:Number){
    for(let i=0;i<this.toutes_les_echeances.length;i++)
    {
      if(this.toutes_les_echeances[i].numero==numero){
        this.toutes_les_echeances[i].somme_rembourser=0
        this.toutes_les_echeances[i].payement_progress=0
        this.toutes_les_echeances[i].statut=false
        break
      }
    }
    
    let echeance_dico=new Map();
    echeance_dico['echeance']=this.toutes_les_echeances.filter(function(element){
      return element!=null
    })
     
    echeance_dico['credit_id']=Number(this.id)
    echeance_dico['id']=this.id_echeance
   // echeance_dico['is_all_ok']=this.is_ok
    this.echance$.update_echeance(this.id_echeance,echeance_dico).subscribe({
      next:(val)=>{
        //  this.dialogRef.close(true);
        console.log('Mise a jour des echeances effectuee avec success')
        this.is_newly_generate=false
        this.get_echeances();
      },
      error:console.log
    })

  }

  save_echeance_id(echeance_id){
    this.id_echeance=echeance_id
  }
  get_echeances(){ 

    //on recupere toutes les echeances
       this.echance$.get_echeance().subscribe({
        next:(val)=>{
          let echeance_id=0
          for(let i=0;i<val.length;i++){
            if(val[i].credit_id==this.id)
             {
              this.save_echeance(val[i].echeance)
              this.save_is_all_ok(val[i].is_all_ok)
              this.save_laste_update(val[i].last_updated)
              echeance_id=val[i].id
              this.save_echeance_id(echeance_id)
             }
          }
          //console.log(this.toutes_les_echeances)
          let to_day=new Date();
          console.log(this.is_newly_generate)
          if(this.is_newly_generate==false){
                
            
         //   console.log(this.datePipe.transform(new Date(), 'yyyy-MM-dd'))
           // console.log(this.last_updated)

         
               
             
        //  console.log(this.toutes_les_echeances)
        for(let i=0;i<this.toutes_les_echeances.length;i++)
        {
          //nbre_jours=;
        // to_day.getDate()
        let last_day=new Date(this.toutes_les_echeances[i].date_delai_payement)
        //console.log(to_day.getTime()+'---->'+last_day.getTime())
        
          let variation=last_day.getTime()-to_day.getTime()
          const variation_nbre_jour=Math.trunc(variation/(24*3600000))
          

          if(variation_nbre_jour<=-3){
           // console.log(variation_nbre_jour)
           
            if(Number(this.toutes_les_echeances[i].retard)==0)
            { 
            //  console.log('fcfa--------------------------------------')
              this.toutes_les_echeances[i].retard=variation_nbre_jour;
            const som=Number(this.loan.loan_amount)
         //   console.log(som+'fcfa')
            this.toutes_les_echeances[i].montant_a_payer=Math.trunc(Number((3*som/100))+Number(this.toutes_les_echeances[i].montant_a_payer))
            }
          }

         

          let echeance_dico=new Map();
          echeance_dico['echeance']=this.toutes_les_echeances.filter(function(element){
            return element!=null
          })
           
          echeance_dico['credit_id']=Number(this.id)
          echeance_dico['is_all_ok']=this.is_all_ok
          echeance_dico['last_updated']=this.datePipe.transform(new Date(),'yyyy-MM-dd')
          echeance_dico['id']=echeance_id
         // echeance_dico['is_all_ok']=this.is_ok
          this.echance$.update_echeance(echeance_id,echeance_dico).subscribe({
            next:(val)=>{
              //  this.dialogRef.close(true);
              console.log('Mise a jour des echeances effectuee avec success')
            },
            error:console.log
          })
        }
        this.update_score()
          // console.log(Math.trunc(variation/(24*3600000)))
          
      }

        },
        error:console.log
      })
      //this.update_echeance()

 
  }
  save_is_all_ok(is_ok){
    this.is_all_ok=is_ok
  }

  save_echeance(element){
    
    this.toutes_les_echeances=element;

     this.nbre_echeance=this.toutes_les_echeances.length;
     //console.log(this.nbre_echeance+'=====')
  }
  save_current_loan(loan:any){
   // console.log(loan)
    this.loan=loan
    this.date_creation=loan.created_date
    this.agent_name=loan.recommending_agent
    /*
     const arr=file.split('fakepath')
    let data=arr.length==1? file:null
    */
    this.endorser_nic_img=loan.endorser.endorser_nic_image.split('fakepath').length==1? loan.endorser.endorser_nic_image:'../../../../assets/images/desc.jpg'
    this.app_nic_img=loan.applicant.nic_image.split('fakepath').length==1? loan.applicant.nic_image:'../../../../assets/images/desc.jpg'
    this.agent$.get_by_id(loan.recommending_agent).subscribe({
      next:(val)=>{
        this.agent_name=val.user.first_name;
      },
      error:console.log
    })
      //console.log(this.loan);
    }

  ngOnInit(): void {
    
   this.id=this.router.snapshot.params['id']
  // console.log(this.id+'<---');
    this.credit$.get_by_id(this.id).subscribe({
      next:(loan)=>{
        this.loan=loan
        this.somme_a_rembourser=Number(loan.loan_amount)+Number(loan.loan_rate*loan.loan_amount)
        this.tranche=Number(this.somme_a_rembourser/loan.loan_delay)
        //console.log(loan)
        this.save_current_loan(loan)
      },
      error:console.log,
      
    })

   
    this.old_credit=new Array()
    this.credit$.get_credits().subscribe({
      next:(val)=>{
        let old_loans=new Array()
         
          val.forEach(element => {
            

            if(element.applicant.nic_number==this.loan.applicant.nic_number)
            old_loans.push(element);
          });
         this.save_old_credits(old_loans)
      },
      error:console.log
    })
  
    this.get_echeances()
   // console.log(this.toutes_les_echeances)
  }
  save_old_credits(old_credit){
    this.old_credit=old_credit
    //console.log(this.old_credit.length)
    this.old_credits_size=this.old_credit.length;
  }

  show_img(img){
    
    const arr=img.split('fakepath')
     let data=arr.length==1? img:null
    const img_modal=this.modal.open(ShowImgComponent,data);
  }

  show_pdf(file){
   // console.log(file)
    const arr=file.split('fakepath')
    let data=arr.length==1? file:null
    const img_modal=this.modal.open(ShowPDFComponent,{data});

  }

  generer_contrat(id:Number){
    let man_id=this.user.user.id?this.user.user.id:11
    this.loan.loan_statut=2;
    //a changer par la vraie url
    this.loan.contrat_non_signe='../../../../assets/Fichiers/2.pdf';
    this.loan.contrat_signe=null;
    this.loan.manager_id=man_id
    this.credit$.update_credits(this.id,this.loan).subscribe({
      next:()=>{
        const data={
          "type":"Credit",
          "details":"Un nouveau contrat a été generé par :"+this.user.user.first_name,
          "date":this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
          'to':'agent',
          "lu":false,
        }
        this.notification$.add_notifications(data).subscribe({
          next:(val)=>{
            console.log('Notifications envoye');
          },
          error:console.log
        })
      },
      error:console.log
    })
  }

  import_pdf(){
     
    const data=this.loan
    const dialogref=this.modal.open(ImportFIleComponent,{data});
    dialogref.afterClosed().subscribe(
      {
          next:(val)=>{
            if(val)
            {
              const data={
                "type":"Credit",
                "details":"Un nouveau contrat de credit signé a été importé par agent:"+this.user.user.first_name,
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
            }
          },
          error:console.log
      }
    )



  }

  valider_pret(){
    this.loan.loan_statut=4
     
    this.credit$.update_credits(this.loan.id,this.loan).subscribe({
      next:()=>{
       // console.log('Credits validé par le manager')

        const data={
          "type":"Credit",
          "details":"Un de vos pret vient d etre valide par un manageur:"+this.user.user.first_name,
          "date":this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
          'to':'agent',
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
      complete:()=>console.log('fin de requete')
    })
  }
  generer_les_echeances(){
   
    const diviseur=this.loan.loan_delay
    const somme=this.loan.loan_amount
    const tranche=Math.trunc(Number(((somme*this.loan.loan_rate)+somme))/Number(diviseur))
   // console.log('--------------------')
    this.date=new Date()
    this.last_date=new Date()
    this.last_date=this.date
    let all_echeances=new Map()
    for(let i=1;i<=Number(this.loan.loan_delay);i++){
      let temp_date;
      if(this.loan.type_duree=='Mensuel'){
        temp_date= this.date.setMonth(this.last_date.getMonth()+1)
      }
      else{
        temp_date=this.date.setDate(this.last_date.getDate()+7)
      }
      //this.date.setMonth(this.last_date.getMonth()+1)
     
      this.tab_echeance.push(this.datePipe.transform(temp_date,'yyyy-MM-dd'))
      this.last_date=new Date(temp_date)
      this.tab_echance_payement.push(tranche)
     const is_current=i==1? true:false;
     const id_loan=this.loan.id
     const dt=this.datePipe.transform(temp_date,'yyyy-MM-dd')
     var echeance_tmp={
      
      numero:i,
      montant_a_payer:tranche,
      date_delai_payement:dt,
      somme_rembourser:0,
      payement_progress:0,
      is_current:i==1? true:false,
      retard:0,
      date_dernier_payement:dt, 
      statut:false
     }
     
      this.toutes_les_echeances.push(echeance_tmp)
      
    }
    all_echeances['echeance']=this.toutes_les_echeances
    all_echeances['credit_id']=this.loan.id
    all_echeances['last_updated']=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    all_echeances['is_all_ok']=false

   // console.log(JSON.stringify(all_echeances))
    this.echance$.add_echeance(all_echeances).subscribe({
        next:(val)=>console.log('Echeance ajoute avec success'),
        error:console.log
      })
      
   // console.log(this.toutes_les_echeances)

    this.loan.loan_statut=5
    this.loan.is_active=true
     
   this.credit$.update_credits(this.loan.id,this.loan).subscribe({
      next:()=>{
        //console.log('Credits validé par le manager')
      },
      error:console.log,
      complete:()=>console.log('fin de requete')
    })
    this.is_newly_generate=true
    this.get_echeances()
  }

  make_repayment(){
   
    const data=this.loan;
     
    const dailoref=this.modal.open(RepaymentComponent,{data})
    dailoref.afterClosed().subscribe(
      {
          next:(val)=>{
            if(val)
            {
              this.get_echeances();
            }
          },
          error:console.log
      }
    )
  }

  geler_demander(id:Number){
    
  }

  redirect_to_view(id:number){
   // console.log(this.user.user.is_manager)
    if(this.user.user.is_manager)  location.href='/dashboard/viewcredits/'+id
    else   location.href='/agent-home/viewcredits/'+id
  }
}


 