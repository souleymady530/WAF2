import { Component,OnInit } from '@angular/core';
import{Chart,registerables} from'node_modules/chart.js' 
import { CreditService } from 'src/app/services/Credit/credit.service';
Chart.register(...registerables);


@Component({
  selector: 'app-loans-per-sex',
  templateUrl: './loans-per-sex.component.html',
  styleUrls: ['./loans-per-sex.component.css']
})
export class LoansPerSexComponent implements OnInit {
app_map!:any
grape_color=localStorage.getItem("theme_mode")==='light'? 'white':'rgb(20,20,50)'
  grape_bar_color=localStorage.getItem("theme_mode")==='light'? 'white':'rgb(127, 127, 184)'
  is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false
  ngOnInit():void{
    this.Make_chart()
  }
constructor(private credit$:CreditService){
this.app_map=new Map()
this.credit$.get_credits().subscribe({
  
  next:(val)=>{
    let somme_h=0
  let somme_f=0
    val.forEach(element => {
      if(element.loan_statut==5 && element.applicant.gender=='M')  somme_h+=element.loan_amount
      if(element.loan_statut==5 && element.applicant.gender=='F')        somme_f+=element.loan_amount
    });
      //console.log(this.app_map)
      var data=[]
     
      data=[somme_h,somme_f]
      new Chart('pie-1', {
        
        type: 'pie',
        data: {
          labels: ['Homme', 'Femme'],
          
          datasets: [{
            label: '',
            data: data,
            backgroundColor:['lightblue','orange'],
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
  Make_chart(){
       
 
  }

}
