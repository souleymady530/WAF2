import { Component,OnInit } from '@angular/core';
import { GeneraleServiceService } from 'src/app/services/General/generale-service.service';
import { AgentService } from 'src/app/services/agent/agent.service';

@Component({
  selector: 'app-accueil-agent',
  templateUrl: './accueil-agent.component.html',
  styleUrls: ['./accueil-agent.component.css']
})
export class AccueilAgentComponent implements OnInit {
  nbre_agents!:Number;
  nbre_managers!:Number;
  nbre_credits!:Number;
  nbre_applicant!:Number;
  
  
  constructor(private general_service:GeneraleServiceService){
    this.general_service.count_agent().subscribe({
      next:(val)=>{
         this.save_number(val.length,1)
      }
    });
    this.general_service.count_manager().subscribe({
      next:(val)=>{
         this.save_number(val.length,2)
      }
    });
   this.general_service.count_credits().subscribe({
    next:(val)=>{
      let nbre=0;
       
      for(let i=0;i<val.length;i++)
      {
         
        if(val[i].is_active)
          nbre++;
      }
      
      this.save_number(nbre,3)
    }
  });
  
   this.general_service.count_all_loans().subscribe({
    next:(val)=>{
   
      this.save_number(val.length,4)
    }
  });
     
  }
  
  save_number(val,ind){
  
    if(ind==1)
      this.nbre_agents=val
    else if(ind==2)
      this.nbre_managers=val
    else if(ind==3)
      this.nbre_credits=val
    else if(ind==4)
      this.nbre_applicant=val
  
  }
   
  
  
  
  
  ngOnInit(): void {
    
  }
     
  }
  