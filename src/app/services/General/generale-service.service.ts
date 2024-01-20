import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CreditService } from '../Credit/credit.service';
import { EcheanceService } from '../Echeance/echeance.service';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class GeneraleServiceService {
  base_api=environment.baseUrl;
  //base_json="http://localhost:3000";
  base_json=this.base_api

  somme_payer=0
   somme=0;


  constructor(private http:HttpClient,private credit$:CreditService,private echeance$:EcheanceService,private datePipe:DatePipe) { }

  count_agent():Observable<any>
  {
    
    return this.http.get(this.base_api+"/agents/",{ withCredentials: true })
  }


  count_manager():Observable<any>
  {
     
    return this.http.get(this.base_api+"/managers/",{ withCredentials: true })
  }

  count_credits():Observable<any>
  {
     
    return this.http.get(this.base_json+"/loans/",{ withCredentials: true })
  }

  count_all_loans():Observable<any>
  {
     
    return this.http.get(this.base_json+"/loans/",{ withCredentials: true })
  }

   
  get_echeance():Observable<any>
  {
     
    return this.http.get(this.base_json+"/echeance/",{ withCredentials: true })
  }
  get_montant_allouee():number
  {
     let somme=0;
     this.credit$.get_credits().subscribe({
      next:(val)=>{
        val.forEach(element => {
          if(element.loan_statut==5){
            this.add_loan(element.loan_amount)
          }
        });
        return this.somme;
      },
      error:console.log
     })

     return 0;
    //return this.http.get(this.base_json+"/echeance/",{ withCredentials: true })
  }

  amount_payed():number{
     this.get_echeance().subscribe({
      next:(val)=>{
        for(let k=0;k<val.length;k++)
        {
          if(val[k].echeance.statut==true)
            this.update_somme(val[k].echeance.montant_a_payer)
          
        }
        
     
        return this.somme_payer
      },
    error:console.log,
    })
   return 0
  }

  add_loan(amount:number){
    this.somme+=amount;
    console.log(amount)
  }
   
update_somme(som:number){
  this.somme_payer+=som
  console.log(som)
}

//this will update all echeance
update_echeance(){
  console.log('Start here')
  this.credit$.get_credits().subscribe({
    next:(val)=>{
      
      val.forEach(element => {
        if(element.loan_statut==5)
        {
          console.log('1')
              let credit_id=element.id
              this.echeance$.get_by_id(credit_id).subscribe({
                next:(all)=>{
                  const toutes_les_echeances=all.echeance
                  let to_day=new Date();
                  console.log('2')
                  //mise a jour des sommes  en fonction des delais
                  console.log(toutes_les_echeances)
                  if(''+this.datePipe.transform(new Date(), 'yyyy-MM-dd')!==''+all.last_updated){
                for(let i=0;i<toutes_les_echeances.length;i++)
                {
                  console.log('3')
                    //nbre_jours=;
                  // to_day.getDate()
                  let last_day=new Date(toutes_les_echeances[i].date_delai_payement)
                  console.log(to_day.getTime()+'---->'+last_day.getTime())
                  
                    let variation=last_day.getTime()-to_day.getTime()
                    const variation_nbre_jour=Math.trunc(variation/(24*3600000))
                    if(variation_nbre_jour<=-3){
                      toutes_les_echeances[i].retard=variation_nbre_jour;
                    }
                    if(toutes_les_echeances[i].retard<=-3)
                    {
                    const som=Number(toutes_les_echeances[i].montant_a_payer)
                    toutes_les_echeances[i].montant_a_payer=Number((3*som/100))+Number(som)
                    }
                  
                  let echeance_dico=new Map();
                  echeance_dico['echeance']=toutes_les_echeances 
                  
                  echeance_dico['credit_id']=credit_id
                  echeance_dico['id']=all.id
                  
                  this.echeance$.update_echeance(all.id,echeance_dico).subscribe({
                    next:(val)=>{
                      //  this.dialogRef.close(true);
                      console.log('Updated sucessfully')
                    },
                    error:console.log
                  }) 
              }
              }
                
                },
                error:console.log
              })
          }
      });
      
    },
    error:console.log,
  })
  console.log('end here')
}

}

