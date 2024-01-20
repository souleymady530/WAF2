import { DatePipe } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreditService } from 'src/app/services/Credit/credit.service';
import { EcheanceService } from 'src/app/services/Echeance/echeance.service';
import { GeneraleServiceService } from 'src/app/services/General/generale-service.service';
import { AgentService } from 'src/app/services/agent/agent.service';


@Component({
  selector: 'app-view-retards',
  templateUrl: './view-retards.component.html',
  styleUrls: ['./view-retards.component.css']
})
export class ViewRetardsComponent implements OnInit{

  is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false
  today_echeance!:any
  late_echeance!:any
  tab_late_loans_id!:any
  toutes_les_echeances!:Array<any>
  user=JSON.parse(localStorage.getItem("currentUser"));
  late_formule_1=new Array()
  late_formule_2=new Array()


  constructor(private route:Router,private general_service:GeneraleServiceService,private router:Router,private echeance$:EcheanceService,private datePipe:DatePipe,private credits$:CreditService){
    this.init_this_panel();
    //this.general_service.update_echeance();
  }
  ngOnInit(): void {
    
  }

  view_details(id:Number){
    if(this.user.user.is_manager)  this.route.navigateByUrl('/dashboard/viewcredits/'+id)
  else   this.route.navigateByUrl('/agent-home/viewcredits/'+id)
  }
  init_this_panel(){
    this.today_echeance=new Array()
    this.late_echeance=new Array()
    let to_day=this.datePipe.transform(new Date(),'yyyy-MM-dd')  ;
    this.credits$.get_credits().subscribe({
      next:(val)=>{
        val.forEach(loan => {
            if(loan.loan_statut==5)
            {
              let credit_id=loan.id
              if(loan.loan_type=='Formule Classique')
              {
                this.echeance$.get_echeance().subscribe({
                  next:(val)=>{
                    for(let k=0;k<val.length;k++)
                    {
                      let retard_echeance=0
                      //on a toutes les echeances du credit en question
                      if(val[k].credit_id==credit_id && val[k].is_all_ok==false)
                      {
                        //parcours des echeances
                          for(let i=0;i<val[k].echeance.length;i++)
                          {
                              let last_day=new Date(val[k].echeance[i].date_delai_payement)
                              //console.log(to_day.getTime()+'---->'+last_day.getTime())
                              let to_day1=new Date();
                              let variation=last_day.getTime()-to_day1.getTime()
                              const variation_nbre_jour=Math.trunc(variation/(24*3600000))
                              if(variation_nbre_jour<=-3)
                              {
                                retard_echeance++
                              }
                          }
                          if(retard_echeance!=0)
                          {
                             const data=
                             {
                              'credit':loan,
                              'retard':retard_echeance,
                              }
                            this.save_late_echeance(data,1)
                          } 
                      }
                      
                    }
                  }
                })
              }
              else if(loan.loan_type=='Formule 2')
              {
                this.echeance$.get_echeance().subscribe({
                  next:(val)=>{
                    for(let k=0;k<val.length;k++)
                    {
                      let retard_echeance=0
                      //on a toutes les echeances du credit en question
                      if(val[k].credit_id==credit_id && val[k].is_all_ok==false)
                      {
                        //parcours des echeances
                          for(let i=0;i<val[k].echeance.length;i++)
                          {
                              let last_day=new Date(val[k].echeance[i].date_delai_payement)
                              //console.log(to_day.getTime()+'---->'+last_day.getTime())
                              let to_day1=new Date();
                              let variation=last_day.getTime()-to_day1.getTime()
                              const variation_nbre_jour=Math.trunc(variation/(24*3600000))
                              if(variation_nbre_jour<=-3)
                              {
                                retard_echeance++
                              }
                          }
                          if(retard_echeance!=0)
                          {
                             const data=
                             {
                              'credit':loan,
                              'retard':retard_echeance,
                              }
                            this.save_late_echeance(data,2)
                          } 
                      }
                      
                    }
                    
                  }
                })
              }
              
                
            }
        });
      }
    })
  }
  
  


   
 

  save_late_echeance(element:any,type:any){
      
     if(type==1)    this.late_formule_1.push(element)
     else if(type==2)    this.late_formule_2.push(element)
  }


  //this will redierect to view details of loans id
  redirect_loan_details(id:any)
  {
    if(this.user.user.is_manager)  location.href='/dashboard/viewcredits/'+id
    else   location.href='/agent-home/viewcredits/'+id
  }
}

 