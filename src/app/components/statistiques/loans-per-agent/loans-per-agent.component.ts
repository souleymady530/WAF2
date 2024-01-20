import { Component, OnInit } from '@angular/core';
import{Chart,registerables} from'node_modules/chart.js' 
import { CreditService } from 'src/app/services/Credit/credit.service';
import { AgentService } from 'src/app/services/agent/agent.service';
Chart.register(...registerables);
@Component({
  selector: 'app-loans-per-agent',
  templateUrl: './loans-per-agent.component.html',
  styleUrls: ['./loans-per-agent.component.css']
})
export class LoansPerAgentComponent  implements OnInit{
  tab_agent_name=new Array()
  tab_agent_data=new Array()

  
  is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false
  grape_color=localStorage.getItem("theme_mode")==='light'? 'white':' '
  grape_bar_color=localStorage.getItem("theme_mode")==='light'? 'white':' '

  ngOnInit(): void {
    this.RenderChart()
  }

  constructor(private agent$:AgentService,private credit$:CreditService){
    this.agent$.get_agents().subscribe({
      next:(val)=>{
       // console.log(val)
        val.forEach(agent => {
 
          let id=agent.id
          let nbre_credit=0
          let k=0;
          this.credit$.get_credits().subscribe({
            next:(val)=>{
 
              val.forEach(element => {
                
                
                  if(element.loan_statut==5 && element.recommending_agent==id){
                    nbre_credit++;
                   
                   k++ 
                  }
              });

              this.tab_agent_name[k]=agent.user.first_name
              this.tab_agent_data[k]=nbre_credit
            },
            error:console.log
          })
          // console.log(this.tab_agent_name)
        });

        new Chart('pie', {
          type: 'bar',
          data: {
            labels: this.tab_agent_name,
            datasets: [{
               
              data: this.tab_agent_data,
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

      },
      error:console.log
    })
  }

  RenderChart(){
   

  
  }
}
