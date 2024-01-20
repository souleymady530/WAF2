import { Component,OnInit } from '@angular/core';
import { GeneraleServiceService } from 'src/app/services/General/generale-service.service';
import { AgentService } from 'src/app/services/agent/agent.service';

@Component({
  selector: 'app-accueil-agent',
  templateUrl: './accueil-agent.component.html',
  styleUrls: ['./accueil-agent.component.css']
})
export class AccueilAgentComponent 
{
  user=JSON.parse(localStorage.getItem("currentUser"));

  nbre_agents!:Number;
  nbre_managers!:Number;
  nbre_credits!:Number;
  nbre_applicant!:Number;
  nbre_loans!:Number;
  
  
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
         
        if(val[i].is_active && val[i].recommending_agent==this.user.id)
          nbre++;
      }
      
      this.save_number(nbre,3)
    }
  });
  
  
   this.general_service.count_credits().subscribe({
    next:(val)=>{
      let nbre=0;
       
      for(let i=0;i<val.length;i++)
      {
         
        if(val[i].recommending_agent==this.user.id)
          nbre++;
      }
      
      this.save_number(nbre,5)
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
    else if(ind==5)
      this.nbre_loans=val
  
  }
   
  
  
  
  
  ngOnInit(): void {
    
  }
     
}
