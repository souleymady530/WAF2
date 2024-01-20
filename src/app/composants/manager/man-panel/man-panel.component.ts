 import { Component, Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-man-panel',
  templateUrl: './man-panel.component.html',
  styleUrls: ['./man-panel.component.css']
})
export class ManPanelComponent implements OnInit{
  managa=true
  @Input() is_man=false;
  @Input() is_agent=false;
 // is_light_mode=true
  @Input() collapsed=false;
  @Input() screen_width=0;
  is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false
  get_body_class():string{
    let styleClass='';
    if(this.collapsed && this.screen_width>768)
    {
      styleClass="body-trimmed"
    }
    else if(this.collapsed && this.screen_width<=768 && this.screen_width>0)
    {
      styleClass="body-md-screen"
    }
    return styleClass;
  }
  ngOnInit(): void {

    this.is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false
    console.log(this.is_light_mode)
  }
}
