import { Component,OnInit } from '@angular/core';
import{Chart,registerables} from'node_modules/chart.js' 
import { CreditService } from 'src/app/services/Credit/credit.service';
Chart.register(...registerables);
@Component({
  selector: 'app-loans-per-profession',
  templateUrl: './loans-per-profession.component.html',
  styleUrls: ['./loans-per-profession.component.css']
})
export class LoansPerProfessionComponent implements OnInit
{

  data!:any 
  is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false
  grape_color=localStorage.getItem("theme_mode")==='light'? 'white':'rgb(20,20,50)'
  grape_bar_color=localStorage.getItem("theme_mode")==='light'? 'rgb(127, 127, 184)':'white'

  ngOnInit(): void {
    this.RenderChart()
  }

  constructor(private credit$:CreditService){
    this.credit$.get_credits().subscribe({
      next:(val)=>{
        this.data=new Map()
        //initiatilisation
        val.forEach(element => {
          let activity=element.applicant.profession;
          if(element.loan_statut>=5) 
            if(element.applicant.profession!=='null' )     this.data.set(activity,0);
        });

        var prof_data=[]
        var prof=[]
       let i=0;
        for(const [k,v] of this.data){
          let nbre=0 
          let somme=0
          if(k!=null && k+''!=='')
          {
           
          val.forEach(element => {
            if(element.loan_statut>=5)
              if(element.applicant.profession==k)
              {
                somme+=Number(element.loan_amount)
              } });
          }
          
       
       // console.log('-------------------------------')
       // console.log(nbre)
       i++;
      // console.log(somme+'----------')
        this.data.set(k,somme)
        prof_data[i]=somme
        prof[i]=String(k)
        }

        //chart part
        //on va filtre pour enelever les null et
        prof=prof.filter(function (el) {
          return el != null;
        });
        prof_data=prof_data.filter(function (el) {
          return el != null;
        });
 
        new Chart('pie-prof', {
          
          type: 'bar',
          data: {
            labels:  prof,
            datasets: [{
              label: 'Somme Total:',
              data: prof_data,
              borderWidth: 1,
              
              backgroundColor:this.grape_bar_color,
              

            }]
          },
          options: {
            scales: {
              
              
            },
            
          }
        });


      },
      error:console.log
    })
  }

  RenderChart()
  {
   

 
  }
}
