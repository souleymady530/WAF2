import { Component,OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { CreditService } from 'src/app/services/Credit/credit.service';
@Component({
  selector: 'app-loans-per-mounth',
  templateUrl: './loans-per-mounth.component.html',
  styleUrls: ['./loans-per-mounth.component.css']
})
export class LoansPerMounthComponent implements OnInit
{
  theme_mode='light'
 // is_light_mode=true; 
  grape_color=localStorage.getItem("theme_mode")==='light'? 'white':'rgb(20,20,50)'
  grape_bar_color=localStorage.getItem("theme_mode")==='light'? 'white':'rgb(127, 127, 184)'

  chart!:any
  tab_label=[
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
     
  ]
  tab_data=new Array()
  is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false
ngOnInit(){
  this.theme_mode=localStorage.getItem("theme_mode")
  this.is_light_mode=this.theme_mode==='light'? true:false
}
  
  constructor(private credit$:CreditService){
   
    this.credit$.get_credits().subscribe({
      next:(all_loans)=>{
        var data=[]
        this.init_data(data)
        for(let i=1;i<13;i++){
          let nbre=0;
              all_loans.forEach(element => {
                let created_date=element.created_at
                //console.log(created_date)
                
                 
                let id=Number(created_date.split('-')[1])-1
                if(id==i) nbre++;
                //console.log(id)
                
                  //console.log(month)
              
              
                  //console.log(this.loan_tab)
              
              })
            //  console.log(i+'---->'+nbre)

              this.update_number(i,nbre);
              data[i]=nbre
              this.chart=new Chart(
                { 
                  chart:  
                  {
                    backgroundColor:this.grape_bar_color,
                    borderWidth: 0,
                    plotBackgroundColor:this.grape_bar_color,
                    
                    plotBorderWidth: 1,
                    
                    plotBorderColor:this.grape_color,
                  },
                  
                      
                  title:
                    {
                      text:"<h1>Crédits / Mois</h1>"
                    },
              
                  xAxis:
                  {
                    categories:this.tab_label
                  },
                  yAxis:
                  {
                    title:
                    {
                      text:"Nombre de credits"
                    }
                  },
                  series:[
                    {
                     type:"line",
                    data:data,
                    } 
                  ],
                  credits:{
                    enabled:false,
                  }
                  
                })

        }
         
      },
      error:console.log
    })
  const data=this.tab_data
var data2=new Array()
    //console.log(data)
     
    
   
     
 // console.log(data2)
//this.chart.options.series=

  
  }
  init_data(data){
    for(let i=0;i<this.tab_label.length;i++) data[i]=0;
  }
  update_number(i,nbre){
    this.tab_data[i]=nbre
     
  }
}
