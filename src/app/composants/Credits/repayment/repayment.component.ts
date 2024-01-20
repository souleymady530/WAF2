import { DatePipe } from '@angular/common';
import { Component,Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreditService } from 'src/app/services/Credit/credit.service';
import { EcheanceService } from 'src/app/services/Echeance/echeance.service';


@Component({
  selector: 'app-repayment',
  templateUrl: './repayment.component.html',
  styleUrls: ['./repayment.component.css']
})
export class RepaymentComponent implements OnInit{

  private loan_id!:any
  loan!:any
  is_ok=false;
  toutes_les_echeances=Array()
  nbre_echeance_valide=0;
  nbre_echeance=0;
  is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false
  
  repaymentFormGroup=this.form_builder.group({
    
    montant: [null,[Validators.required]],
     
     })
     private current_id=0

     constructor(private datePipe:DatePipe,  private echeance$:EcheanceService, private credit_service:CreditService,private form_builder:FormBuilder,@Inject(MAT_DIALOG_DATA) public data:any, private dialogRef:MatDialogRef<RepaymentComponent>,){
   
      this.loan_id=this.data.id
       this.loan=data
    this.get_echeances();
    
    }
    
    save_id(id){
this.current_id=id
    }
    get_echeances(){ 
    
        
     // console.log('Get echeance strart here')
      this.echeance$.get_echeance().subscribe({
        next:(val)=>{
         
          for(let i=0;i<val.length;i++){
            if(val[i].credit_id==this.loan.id)
             {  
              this.save_echeance(val[i].echeance)
              this.save_id(val[i].id)
             }
          }
         

        },
        error:console.log
      })

     
      //console.log('end echeance strart here')


    }
  
    save_nbre(nbre:number){
      this.nbre_echeance_valide=nbre
    }
    save_echeance(element){
      this.toutes_les_echeances=new Array()
      this.toutes_les_echeances=element;
  
       this.nbre_echeance=this.toutes_les_echeances[0].length;
    //  console.log('--------------------------')
    //  console.log(this.toutes_les_echeances)
    }


  ngOnInit(): void {
    this.loan_id=this.data.id
      
    this.credit_service.get_by_id(this.loan_id).subscribe({
      next:(val)=>{
          this.loan=val
      },
      error:console.log,
      complete:()=>console.log('Fin de requete')
    })

    this.get_echeances();
  }

  valider(){
    this.is_ok=false

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
          this.toutes_les_echeances[0][i].nbre_jours=variation_nbre_jour;
         }
         if(this.toutes_les_echeances[0][i].nbre_jours<=-3)
         {
          const som=Number(this.toutes_les_echeances[0][i].montant_a_payer)
          this.toutes_les_echeances[0][i].montant_a_payer=Number((3*som/100))+Number(som)
         }
        // console.log(Math.trunc(variation/(24*3600000)))
       
    }
    //console.log('--------------------------')
    //validation du payement
     
    let current_index=-1,last_activate=-1
    let total_repayment_statut=0;
    let somme=Number(this.repaymentFormGroup.value.montant),som_restante
    const tranche=Math.trunc(Number(this.data.loan_amount)/Number(this.data.loan_delay))
    let nbre=Math.trunc(somme/tranche)
   // console.log('-----------------------')
    var i=0;
   // console.log(this.toutes_les_echeances.length)
    const last_payment_date=this.datePipe.transform(new Date(),'yyyy-MM-dd')
    for(i=0;i<this.toutes_les_echeances.length;i++){
    //  console.log(i)
  //  console.log(this.toutes_les_echeances[i].is_current+'-----------------------')

      if(this.toutes_les_echeances[i].is_current)
        current_index=i;
   
      if(!this.toutes_les_echeances[i].statut)
        {
         
          //si on peut retirer la somme a payer et avoir un restant alors l echeance est valide
          if(somme>=Number(this.toutes_les_echeances[i].montant_a_payer)-Number(this.toutes_les_echeances[i].somme_rembourser))
          { 
            som_restante=somme-Number(this.toutes_les_echeances[i].montant_a_payer)+Number(this.toutes_les_echeances[i].somme_rembourser)
           
          //  console.log(this.toutes_les_echeances[0][i].somme_rembourser)
           
            this.toutes_les_echeances[i].somme_rembourser=this.toutes_les_echeances[i].montant_a_payer
            this.toutes_les_echeances[i].payement_progress=(this.toutes_les_echeances[i].somme_rembourser*100)/this.toutes_les_echeances[i].montant_a_payer
            this.toutes_les_echeances[i].date_dernier_payement=last_payment_date
           // console.log('-----------0000--------')
            somme=Number(som_restante)
            this.toutes_les_echeances[i].statut=true
            last_activate=i;
            total_repayment_statut++;
           // console.log(somme)
            if(total_repayment_statut==this.toutes_les_echeances.length)             
             { i=Number(this.toutes_les_echeances[0].length++)
              this.is_ok=true}


          
        }
            
        }
        else total_repayment_statut++;
        
    }
   
    
    this.toutes_les_echeances[current_index].is_current=false
    this.toutes_les_echeances[last_activate].is_current=true
    this.nbre_echeance_valide=total_repayment_statut
    //console.log(total_repayment_statut+'----'+this.toutes_les_echeances[0].length)
    if(total_repayment_statut==this.toutes_les_echeances.length)
        this.is_ok=true
  //  console.log( this.toutes_les_echeances[0]);
    this.update()
  }
  update(){
    let echeance_dico=new Map();
    echeance_dico['echeance']=this.toutes_les_echeances.filter(function(element){
      return element!=null
    })
     
    echeance_dico['credit_id']=this.loan.id
    echeance_dico['id']=this.current_id
    echeance_dico['last_updated']=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    echeance_dico['is_all_ok']=this.is_ok
    this.echeance$.update_echeance(this.current_id,echeance_dico).subscribe({
      next:(val)=>{
        this.update_score()
        //  this.dialogRef.close(true);
      },
      error:console.log
    })
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
    if(nbre_jour<=-30 && this.toutes_les_echeances[i-1].statut) score=6
    this.loan.loan_score=score;
      
    this.credit_service.update_credits(this.loan.id,this.loan).subscribe({
      next:(val)=>{
        console.log('Score mise a jour');
      },
      error:console.log
    })
    
  }
}
/**
 * 
 *   //console.log(val)
          let tab_tmp=new Array()
          let id=this.loan_id
          let total_repayment=0;
         console.log(id)

           
            
            for(let i=0;i<val[0].length;i++)
            {
              if(val[0][i].credit_id==id){
                tab_tmp.push(val[0][i]);
              }
              if(val[0][i].statut){
                total_repayment++;
              }
            }
          this.save_nbre(total_repayment)
          this.save_echeance(tab_tmp);
 */