import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SessionLoginService} from "../../services/session-login/session-login.service";
interface SideNavToogle
{
  screen_width:number;
  collapsed:boolean;
}

@Component({
  selector: 'app-agent-home',
  templateUrl: './agent-home.component.html',
  styleUrls: ['./agent-home.component.css']
})
export class AgentHomeComponent
 {
  is_admin:boolean=true;
  is_man=false;
  is_agent=false;
  
  title = 'dashboard';
  is_sidenav_collapsed=false;
  screen_width=0;

  
  constructor(private router: Router,
              private loginService: SessionLoginService,) {
  }
  ngOnInit(): void {
  }


  logout(){
    this.loginService.logout().subscribe(result=>{
      this.router.navigate(['/login']);
    });
  }
  
  on_toggle_sidenav(data:SideNavToogle):void{
    this.screen_width=data.screen_width;
    this.is_sidenav_collapsed=data.collapsed;
}
}
