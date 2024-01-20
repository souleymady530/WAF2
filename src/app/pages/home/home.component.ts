import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SessionLoginService} from "../../services/session-login/session-login.service";
interface SideNavToogle
{
  screen_width:number;
  collapsed:boolean;
}
//P@ssw0rd

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

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


 
  
  on_toggle_sidenav(data:SideNavToogle):void{
    this.screen_width=data.screen_width;
    this.is_sidenav_collapsed=data.collapsed;
}
}
//
//P@ssw0rd75675420