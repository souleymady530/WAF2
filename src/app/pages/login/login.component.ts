import { Component, OnInit} from '@angular/core';
import {SessionLoginService} from "../../services/session-login/session-login.service";
import {Router} from "@angular/router";
import { ManagerService } from 'src/app/services/Manager/manager.service';
import { AgentService } from 'src/app/services/agent/agent.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username =''
  password =''
  //email="teste@gmail.com"
  wrongCredentials = false

  constructor(
    private sessionLogin: SessionLoginService,
    private router: Router,private man_service:ManagerService,
    private agent_service:AgentService
  ) {
  }


  ngOnInit() {
  }

  login(){
    
    this.wrongCredentials = false;
    this.sessionLogin.login(this.username,this.password).subscribe(
      {
        next:()=>{
          console.log("---------------------------Authentification reussie---------------------------------");


          this.man_service.get_man().subscribe({
            next:(all_man)=>{
              all_man.forEach(element => {
                  if(element.user.username==this.username)
                     {
                      this.init_session(element);
                      this.router.navigateByUrl('dashboard/accueil')
                      
                     }
              });
            },
            error:console.log,
            complete:()=>console.log('Complet request')
          })


          this.agent_service.get_agents().subscribe(
            {
              next:(all_agents)=>{
                all_agents.forEach(element => {
                    if(element.user.username===this.username)
                    {
                      //console.log("Hello")
                      this.init_session(element);
                      this.router.navigateByUrl('agent-home/accueil-agent')
                      
                    }
                });
              }
            }
          )
         
        },
        error:()=>{

          this.wrongCredentials = true;
        },
         complete:()=>console.log('Complet request')
      }
    );

  }


  init_session(element:any){
    localStorage.setItem("currentUser",JSON.stringify(element));
  }
}
