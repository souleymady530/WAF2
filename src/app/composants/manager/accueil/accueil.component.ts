import { DatePipe } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreditService } from 'src/app/services/Credit/credit.service';
import { EcheanceService } from 'src/app/services/Echeance/echeance.service';
import { GeneraleServiceService } from 'src/app/services/General/generale-service.service';
import { AgentService } from 'src/app/services/agent/agent.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css','../../../../assets/style/dark.css']
})
export class AccueilComponent {
  nbre_agents!:Number;
  nbre_managers!:Number;
  nbre_credits!:Number;
  nbre_applicant!:Number;
  nbre_client=0
  total_credit=0
  total_payed=0
  pourcentage=0
  user=JSON.parse(localStorage.getItem("currentUser"));

  late_applicant=0
  nbre_credits_statut1=0
  nbre_credits_statut2=0
  nbre_credits_accordes=0
  nbre_credits_statut3=0
  nbre_credits_statut4=0
  today_echeance=new Array()
  late_echeance=new Array()
  toutes_les_echeances!:any
  theme_mode='light'
  is_light_mode=true
  constructor(private credit$:CreditService,  private general_service:GeneraleServiceService,private router:Router,private echeance$:EcheanceService,private datePipe:DatePipe){
    this.general_service.count_agent().subscribe({
      next:(val)=>{
         this.save_number(val.length,1)
      }
    });
    this.total_credit=this.general_service.get_montant_allouee();
    this.total_payed=this.general_service.amount_payed()
     
    this.general_service.count_manager().subscribe({
      next:(val)=>{
         this.save_number(val.length,2)
      }
    });
   this.general_service.count_credits().subscribe({
    next:(val)=>{
      let nbre=0;
      let nbre_credits_statut1=0
      let nbre_credits_statut2=0
      let nbre_credits_statut3=0
      let nbre_credits_statut4=0
      let nbre_credit_geler=0
      let nbre_credits_accordes=0
      let somme=0;
      for(let i=0;i<val.length;i++)
      {
         
        if(val[i].loan_statut>=5) {nbre++; somme+=Number(val[i].loan_amount)}
        if(val[i].loan_statut==1) nbre_credits_statut1++;
        if(val[i].loan_statut==2) nbre_credits_statut2++;
        if(val[i].loan_statut==3) nbre_credits_statut3++;
        if(val[i].loan_statut==4) nbre_credits_statut4++;
        if(val[i].loan_statut==5) nbre_credits_accordes++;
        if(val[i].loan_statut==-1) nbre_credit_geler++;
        
        
      }
       
      
      this.save_number(somme,-5)
      this.save_number(nbre,3)

      this.save_number(nbre_credits_statut1,-1)
      this.save_number(nbre_credits_statut2,-2)
      this.save_number(nbre_credits_statut3,-3)
      this.save_number(nbre_credits_statut4,-4)
      this.save_number(nbre_credits_accordes,-9)

      this.save_number(nbre_credit_geler/nbre_credits_accordes,-7)
     }
  });
  
   this.general_service.count_all_loans().subscribe({
    next:(val)=>{
   
      this.save_number(val.length,4)
    }
  });
 
  let to_day=this.datePipe.transform(new Date(),'yyyy-MM-dd')  ;
  this.credit$.get_credits().subscribe({
    next:(val)=>{
      let applicant=new Map()
     
    
      val.forEach(loan => {
       
        
          if(loan.loan_statut>=5){
            let credit_id=loan.id
            applicant.set(loan.applicant.nic_number,0)
            
            this.echeance$.get_echeance().subscribe({
              next:(val)=>{
                for(let k=0;k<val.length;k++){
                  let retard_echeance=0
                  if(val[k].credit_id==credit_id && val[k].is_all_ok==false)
                  {
                    

                      for(let i=0;i<val[k].echeance.length;i++){
                        
                        
                        

                        let last_day=new Date(val[k].echeance[i].date_delai_payement)
                        //console.log(to_day.getTime()+'---->'+last_day.getTime())
                        let to_day1=new Date();
                          let variation=last_day.getTime()-to_day1.getTime()
                          const variation_nbre_jour=Math.trunc(variation/(24*3600000))
                          if(variation_nbre_jour<=-3){
                            retard_echeance++
                           

                          }
                      }
                      if(retard_echeance!=0){
                         const data={
                        'credit':loan,
                        'retard':retard_echeance,
                      }
                      this.save_late_echeance(data)
                      }
                     
                  }
                }
                
                //les eccheances du credtis courants
                
              },
              
            })
              
          }
      });
      this.save_number(applicant.size,-6)
    },
    error:console.log
  })
     
  }
   
  redirect_loan_details(id:any){
    if(this.user.user.is_manager)  location.href='/dashboard/viewcredits/'+id
    else   location.href='/agent-home/viewcredits/'+id
  }
  save_all_echeance(element){
    this.toutes_les_echeances=element
  }
  update_echeance(){
    let to_day=new Date();
    // console.log('--------------------------')

    //mise a jour des sommes  en fonction des delais
    for(let i=0;i<this.toutes_les_echeances[0].length;i++){
          //nbre_jours=;
        // to_day.getDate()
        let last_day=new Date(this.toutes_les_echeances[0][i].date_delai_payement)
        //console.log(to_day.getTime()+'---->'+last_day.getTime())
        
          let variation=last_day.getTime()-to_day.getTime()
          const variation_nbre_jour=Math.trunc(variation/(24*3600000))
          if(variation_nbre_jour<=-3){
          this.toutes_les_echeances[0][i].retard=-3;
          }
          if(this.toutes_les_echeances[0][i].retard==-3)
          {
          const som=Number(this.toutes_les_echeances[0][i].montant_a_payer)
          this.toutes_les_echeances[0][i].montant_a_payer=Number((3*som/100))+Number(som)
          }
        // console.log(Math.trunc(variation/(24*3600000)))
        
    }
  }
  save_echeance(element){
    this.today_echeance.push(element)
  }
  save_late_echeance(element){
    this.late_echeance.push(element)
  }
  
  save_number(val,ind){
  
    if(ind==1)      this.nbre_agents=val
    else if(ind==2)      this.nbre_managers=val
    else if(ind==3)      this.nbre_credits=val
    else if(ind==4)      this.nbre_applicant=val

    else if(ind==-1)      this.nbre_credits_statut1=val
    else if(ind==-2)      this.nbre_credits_statut2=val
    else if(ind==-3)      this.nbre_credits_statut3=val
    else if(ind==-4)      this.nbre_credits_statut4=val
    else if(ind==-5)      this.total_credit=val
    else if(ind==-6)      this.nbre_client=val
    else if(ind==-7)      this.pourcentage=val
    else if(ind==-8)      this.late_applicant=val
    else if(ind==-9)      this.nbre_credits_accordes=val
  
  }
   
  
  redirect_to_loans(){
    if(this.user.user.is_manager) this.router.navigateByUrl('dashboard/credits')
    else  this.router.navigateByUrl('agent-accueil/credits')
  }
  
  
  ngOnInit(): void {
    this.theme_mode=localStorage.getItem("theme_mode")
    this.is_light_mode=this.theme_mode==='light'? true:false
   // console.log(this.is_light_mode)
  }

  view(){
    
  }
}

/**
 * this.credit$.get_credits().subscribe({
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
 */