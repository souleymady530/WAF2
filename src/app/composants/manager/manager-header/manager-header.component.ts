import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/Notifications/notifications.service';

@Component({
  selector: 'app-manager-header',
  templateUrl: './manager-header.component.html',
  styleUrls: ['./manager-header.component.css']
})
export class ManagerHeaderComponent {
  is_notif_active=false
  is_message_active=false
  has_new_nitif=false
  active_dark!:boolean;
  user=JSON.parse(localStorage.getItem("currentUser"))
  icon_theme=''
  theme=''
  liste_notif=new Array();
  is_light_mode=true
  ngOnInit(): void {
    this.is_notif_active=true
    this.is_message_active=true
    
  }
  constructor(private notif$:NotificationsService){
    
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
     this.notif$.get_notifications().subscribe({
      next:(val)=>{
        val.forEach(element => {
          if(element.to=='manager')
          this.add_notif(element)
          if(!element.lu) this.has_new_nitif=true
        });
      }
     })
  }
  add_notif(element:any){
    this.liste_notif.push(element);
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
