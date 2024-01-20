import { Component,EventEmitter, Output,OnInit,HostListener } from '@angular/core';
import {Router} from "@angular/router";
import {SessionLoginService} from "../../services/session-login/session-login.service";
import { interval } from 'rxjs';
const navbardata=[
  {
      routeLink:"accueil",
      icon:"fa fa-home",
      label:"Accueil",
      title:"Accueil"
  },

  {
      routeLink:"managers",
      icon:"fa fa-user-circle",
      label:"Les Managers",
      title:"Les Managers"
  },
  {
      routeLink:"agents",
      icon:"fa fa-users",
      label:"Les Agents",
      title:"Les Agents"
  },

  

  {
      routeLink:"credits",
      icon:"fa fa-share",
      label:"Les Credits Alloues",
      title:"Les Crédits Alloues",
  },
  {
      routeLink:"remboursements",
      icon:"fa fa-reply-all",
      label:"Les Remboursements",
      title:"Les Remboursements"
  },
  {
      routeLink:"settings",
      icon:"fa fa-cogs",
      label:"Settings",
      title:"Paramètres",
  },
  
  
  ];

  interface SideNavToogle
{
  screen_width:number;
  collapsed:boolean;
}


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  public is_man=true;
  public is_agent=false;
  public theme_mode='light'
  public is_ligth_mode=false;
  @Output() on_toggle_sidenav:EventEmitter<SideNavToogle>=new EventEmitter()
  colllapsed=false;
  screen_width=0;
  navbardata=navbardata;
@HostListener("window:resize",['$event'])
onResize(event:any)
{
  this.screen_width=window.innerWidth
  if(this.screen_width<=768)
  {
    this.colllapsed=false
    this.on_toggle_sidenav.emit({collapsed:this.colllapsed, screen_width:this.screen_width})

  }
}
constructor(private router: Router,
  private loginService: SessionLoginService,) {
    this.theme_mode=localStorage.getItem("theme_mode")
}
  ngOnInit(): void {
    this.screen_width=window.innerWidth
    this.theme_mode=localStorage.getItem("theme_mode")
    
  }
  toggle_collapse():void
  {
    this.colllapsed=!this.colllapsed;
    this.on_toggle_sidenav.emit({collapsed:this.colllapsed, screen_width:this.screen_width})
  }

  close_side_nav():void
  {
    this.colllapsed=false;
    this.on_toggle_sidenav.emit({collapsed:this.colllapsed, screen_width:this.screen_width})

  } 
  logout(){
    this.loginService.logout().subscribe(result=>{
      localStorage.removeItem("currentUser")
      localStorage.removeItem("theme_mode")
       
      this.router.navigate(['/login']);
    
    });
  }
}
