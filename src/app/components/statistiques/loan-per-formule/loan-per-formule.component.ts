import { Component,OnInit } from '@angular/core';
import{Chart,registerables} from'node_modules/chart.js' 
import { CreditService } from 'src/app/services/Credit/credit.service';
Chart.register(...registerables);


@Component({
  selector: 'app-loan-per-formule',
  templateUrl: './loan-per-formule.component.html',
  styleUrls: ['./loan-per-formule.component.css']
})
export class LoanPerFormuleComponent {
  app_map!:any
  formule1_map!:any
  formule2_map!:any
  nbre_formule_1=0
  nbre_formule_2=0
  grape_color=localStorage.getItem("theme_mode")==='light'? 'white':'rgb(20,20,50)'
    grape_bar_color=localStorage.getItem("theme_mode")==='light'? 'white':'rgb(127, 127, 184)'
    is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false
    ngOnInit():void{
      
    }
  constructor(private credit$:CreditService){

  this.app_map=new Map()
  this.formule1_map=new Map()
  this.formule2_map=new Map()
this.formule1_map.set('Formule Classique',0)
this.formule2_map.set('Formule 2',0)
  this.credit$.get_credits().subscribe({
    next:(val)=>{
      val.forEach(element => {
      //  console.log('--------------------------------')
        if(element.loan_type=='Formule Classique' && element.loan_statut>=5) {
        
          let montant=Number(element.loan_amount);
          let old_montant=Number(this.formule1_map.get('Formule Classique')?this.formule1_map.get('Formule Classique'):0)
      //    console.log(Number(montant+old_montant))
          this.formule1_map.set('Formule Classique',Number(montant+old_montant))
          this.nbre_formule_1++;
        }
        else if(element.loan_type=='Formule 2' && element.loan_statut>=5){
          let montant=Number(element.loan_amount);
          let old_montant=Number(this.formule2_map.get('Formule 2'))
          this.formule2_map.set('Formule 2',Number(montant+old_montant))
          this.nbre_formule_2++;
        }

        if(element.loan_statut==5)      this.app_map.set(element.applicant.nic_number,element)
      });
       
        //console.log(this.app_map)
       // console.log(this.formule1_map.get('Formule Classique'))
        var donnee=[
          Number(this.formule1_map.get('Formule Classique'))/this.nbre_formule_1,
          Number(this.formule2_map.get('Formule 2'))/this.nbre_formule_2,
        ]
       // console.log(donnee)
       // console.log('--------------------------------')

         
        new Chart('pie-2', {
          
          type: 'pie',
          data: {
            labels: ['Formule Classique', 'Formule 2'],
            
            datasets: [{
              label: '',
              data: donnee,
              backgroundColor:['aqua','lightgreen'],
              borderWidth: 1,
              
              
            }],
            
          },
          
          options: {
            responsive:true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          },
         
        });
    },
    error:console.log
  })
  }
     
}
