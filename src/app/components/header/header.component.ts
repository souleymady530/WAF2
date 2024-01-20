import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  is_notif_active=false
  is_message_active=false
  active_dark!:boolean;
  user=JSON.parse(localStorage.getItem("currentUser"))
  icon_theme=''
  theme=''
  ngOnInit(): void {
    this.is_notif_active=true
    this.is_message_active=true
  }
  constructor(){
    
    //Theme de l utilisateur
    if(localStorage.getItem("theme_mode"))
     {
        console.log(localStorage.getItem("theme_mode"))
        if(localStorage.getItem("theme_mode")=="dark")
         { this.active_dark=true
          this.theme="dark"}
        else if(localStorage.getItem("theme_mode")=="light")
          {this.active_dark=false
          this.theme="light"}
     }
     else
     {
        localStorage.setItem("theme_mode","light")
        this.active_dark=false
        this.theme="light"
     }  

     //active le pan message et le pan notification
     this.is_notif_active=true
     this.is_message_active=true

  }
  dark_mode(){
    if(localStorage.getItem("theme_mode")=="dark"){
        
      localStorage.setItem("theme_mode","light")
      this.active_dark=false;
      this.theme="dark"
    }
    else if(localStorage.getItem("theme_mode")=="light")
     {
      localStorage.setItem("theme_mode","dark")
      this.active_dark=true
      this.theme="light"
     }
     console.log(localStorage.getItem("theme_mode"))
      location.reload() 
  }
  active_message(){
    if(this.is_message_active)
      this.is_message_active=false
    else
      this.is_message_active=true
  }
  active_notif(){
    if(this.is_notif_active)
      this.is_notif_active=false
    else
      this.is_notif_active=true
  }

}
